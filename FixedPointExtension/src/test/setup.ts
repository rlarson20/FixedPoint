import { beforeAll } from 'bun:test';

// Mock browser extension APIs
const mockBrowser = {
  runtime: {
    id: 'test-extension-id',
    sendMessage: () => Promise.resolve(),
    onMessage: {
      addListener: () => {},
      removeListener: () => {},
    },
  },
  tabs: {
    query: () => Promise.resolve([]),
    sendMessage: () => Promise.resolve(),
  },
  storage: {
    local: {
      get: () => Promise.resolve({}),
      set: () => Promise.resolve(),
    },
  },
};

// Set up global browser object before any tests run
beforeAll(() => {
  // Set up global browser object
  (globalThis as any).chrome = mockBrowser;
  (globalThis as any).browser = mockBrowser;

  // Mock the webextension-polyfill module
  (globalThis as any).require = () => ({
    browser: mockBrowser,
  });
}); 