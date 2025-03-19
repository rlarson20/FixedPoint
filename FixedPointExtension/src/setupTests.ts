import '@testing-library/jest-dom';
import type { Browser } from 'webextension-polyfill';

// Mock browser extension APIs
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

// Mock webextension-polyfill module
jest.mock('webextension-polyfill', () => ({
  browser: mockBrowser,
}));

// Set up global browser object for legacy code
(globalThis as any).chrome = mockBrowser;
(globalThis as any).browser = mockBrowser;

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
}); 