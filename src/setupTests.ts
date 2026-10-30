// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {TextDecoder, TextEncoder} from 'util';

// React Router 7 uses these browser globals; CRA's jsdom does not provide them.
Object.assign(global, {TextDecoder, TextEncoder});

// Testing Library 13 still imports the legacy act entry point; use React 19's act.
jest.mock('react-dom/test-utils', () => ({
  ...jest.requireActual('react-dom/test-utils'), act: jest.requireActual('react').act,
}));
