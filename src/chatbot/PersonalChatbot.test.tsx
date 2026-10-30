import React from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import PersonalChatbot from './PersonalChatbot';
import {HISTORY_KEY, ModelAPI, REFUSAL} from './model';

const browser = window as Window & {LanguageModel?: ModelAPI};
let session: {prompt: jest.Mock; destroy: jest.Mock};

async function renderChat() {
  let result!: ReturnType<typeof render>;
  await act(async () => { result = render(<MemoryRouter><PersonalChatbot /></MemoryRouter>); });
  return result;
}

beforeEach(() => {
  sessionStorage.clear();
  Object.defineProperty(window, 'isSecureContext', {configurable: true, value: true});
  session = {prompt: jest.fn().mockResolvedValue(JSON.stringify({kind: 'refuse', text: '', resource: '', repository: ''})),
    destroy: jest.fn()};
  browser.LanguageModel = {availability: jest.fn().mockResolvedValue('available'), create: jest.fn().mockResolvedValue(session)};
});
afterEach(() => { delete browser.LanguageModel; jest.useRealTimers(); });

test.each(['unavailable', 'downloadable', 'downloading'])('is absent when the model is %s', async status => {
  (browser.LanguageModel!.availability as jest.Mock).mockResolvedValue(status);
  const {container} = await renderChat();
  await waitFor(() => expect(browser.LanguageModel!.availability).toHaveBeenCalled());
  expect(container).toBeEmptyDOMElement();
  expect(browser.LanguageModel!.create).not.toHaveBeenCalled();
});

test('is absent when the API is missing or the context is insecure', async () => {
  delete browser.LanguageModel;
  const {container, unmount} = await renderChat();
  expect(container).toBeEmptyDOMElement();
  unmount();
  Object.defineProperty(window, 'isSecureContext', {configurable: true, value: false});
  expect((await renderChat()).container).toBeEmptyDOMElement();
});

test('availability failures hide the widget', async () => {
  (browser.LanguageModel!.availability as jest.Mock).mockRejectedValue(new Error('Blocked by browser'));
  const {container} = await renderChat();
  await waitFor(() => expect(browser.LanguageModel!.availability).toHaveBeenCalled());
  expect(container).toBeEmptyDOMElement();
});

test('opens accessibly, records complete turns, and clears saved history', async () => {
  await renderChat();
  fireEvent.click(await screen.findByRole('button', {name: 'Chat with Wenhao’s AI'}));
  expect(screen.getByRole('dialog', {name: 'Ask Wenhao'})).toBeInTheDocument();
  const input = screen.getByRole('textbox', {name: 'Ask about Wenhao'});
  expect(input).toHaveFocus();
  fireEvent.change(input, {target: {value: 'Write a random sorting algorithm'}});
  fireEvent.click(screen.getByRole('button', {name: 'Send message'}));
  expect(await screen.findByText(REFUSAL)).toBeInTheDocument();
  await waitFor(() => expect(JSON.parse(sessionStorage.getItem(HISTORY_KEY)!)).toHaveLength(2));
  fireEvent.click(screen.getByRole('button', {name: 'Clear'}));
  expect(screen.queryByText(REFUSAL)).not.toBeInTheDocument();
  expect(sessionStorage.getItem(HISTORY_KEY)).toBeNull();
});

test.each(['creation', 'inference'])('%s failure removes the entire widget', async stage => {
  if (stage === 'creation') (browser.LanguageModel!.create as jest.Mock).mockRejectedValue(new Error('Not allowed'));
  else session.prompt.mockRejectedValue(new Error('Model lost'));
  const {container} = await renderChat();
  fireEvent.click(await screen.findByRole('button', {name: 'Chat with Wenhao’s AI'}));
  fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Who are you?'}});
  fireEvent.click(screen.getByRole('button', {name: 'Send message'}));
  await waitFor(() => expect(container).toBeEmptyDOMElement());
  expect(sessionStorage.getItem(HISTORY_KEY)).toBeNull();
  if (stage === 'inference') expect(session.destroy).toHaveBeenCalled();
});

test('stopping a response keeps the widget and does not save the canceled turn', async () => {
  session.prompt.mockImplementation((_input, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
  }));
  await renderChat();
  fireEvent.click(await screen.findByRole('button', {name: 'Chat with Wenhao’s AI'}));
  fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Who are you?'}});
  fireEvent.click(screen.getByRole('button', {name: 'Send message'}));
  await waitFor(() => expect(session.prompt).toHaveBeenCalled());
  fireEvent.click(screen.getByRole('button', {name: 'Stop response'}));
  await waitFor(() => expect(session.destroy).toHaveBeenCalled());
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(sessionStorage.getItem(HISTORY_KEY)).toBeNull();
});
