import browser from 'webextension-polyfill';
import type { Config, Link } from '../types';

interface Message {
  type: string;
  payload?: unknown;
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener((
  message: Message,
  sender: browser.runtime.MessageSender,
  sendResponse: (response?: unknown) => void
) => {
  if (message.type === 'GET_CURRENT_TABS') {
    getCurrentTabs().then(sendResponse);
    return true; // Will respond asynchronously
  }
});

async function getCurrentTabs(): Promise<Link[]> {
  const tabs = await browser.tabs.query({ currentWindow: true });
  return tabs.map((tab: browser.Tabs.Tab) => ({
    url: tab.url || '',
    title: tab.title || '',
    favicon: tab.favIconUrl,
  }));
}

// Initialize extension
browser.runtime.onInstalled.addListener(async () => {
  const defaultConfig: Config = {
    vaultPath: '',
    closeTabs: false,
  };
  
  await browser.storage.local.set({ config: defaultConfig });
}); 