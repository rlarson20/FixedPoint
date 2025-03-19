import { beforeAll } from 'bun:test';
import type { Browser } from 'webextension-polyfill';

const mockBrowser = {
  runtime: {
    id: 'test-extension-id',
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn(),
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
} as unknown as Browser;

beforeAll(() => {
  // Set up global browser object
  (globalThis as any).chrome = mockBrowser;
  (globalThis as any).browser = mockBrowser;

  // Mock webextension-polyfill module
  jest.mock('webextension-polyfill', () => ({
    browser: mockBrowser,
  }));
}); 