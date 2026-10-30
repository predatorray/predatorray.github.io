import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';

test('renders the personal homepage without an unsupported chatbot', async () => {
  await act(async () => { render(<App />); });
  expect(screen.getByRole('heading', {name: 'Wenhao Ji'})).toBeInTheDocument();
  expect(screen.queryByRole('button', {name: 'Chat with Wenhao’s AI'})).not.toBeInTheDocument();
});
