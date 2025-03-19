import browser from 'webextension-polyfill';
import type { Config, Link } from '../types';
import { processLinks, validateVaultPath } from '../utils/api';

// DOM Elements
const vaultPathInput = document.getElementById('vault-path') as HTMLInputElement;
const linksInput = document.getElementById('links-input') as HTMLTextAreaElement;
const closeTabsCheckbox = document.getElementById('close-tabs') as HTMLInputElement;
const getTabsButton = document.getElementById('get-tabs') as HTMLButtonElement;
const processLinksButton = document.getElementById('process-links') as HTMLButtonElement;
const statusDiv = document.getElementById('status') as HTMLDivElement;

// Load saved configuration
async function loadConfig() {
  const result = await browser.storage.local.get('config');
  const config: Config = result.config || { vaultPath: '', closeTabs: false };
  
  vaultPathInput.value = config.vaultPath;
  closeTabsCheckbox.checked = config.closeTabs;
}

// Save configuration
async function saveConfig() {
  const config: Config = {
    vaultPath: vaultPathInput.value,
    closeTabs: closeTabsCheckbox.checked,
  };
  await browser.storage.local.set({ config });
}

// Show status message
function showStatus(message: string, isError = false) {
  statusDiv.textContent = message;
  statusDiv.className = `status ${isError ? 'error' : 'success'}`;
  statusDiv.style.display = 'block';
}

// Get current tabs
async function handleGetTabs() {
  try {
    const tabs = await browser.runtime.sendMessage({ type: 'GET_CURRENT_TABS' });
    const linksText = tabs.map((tab: Link) => tab.url).join('\n');
    linksInput.value = linksText;
  } catch (error) {
    showStatus('Failed to get current tabs', true);
  }
}

// Process links
async function handleProcessLinks() {
  const config: Config = {
    vaultPath: vaultPathInput.value,
    closeTabs: closeTabsCheckbox.checked,
  };

  if (!config.vaultPath) {
    showStatus('Please enter a vault path', true);
    return;
  }

  // Validate vault path
  const isValid = await validateVaultPath(config.vaultPath);
  if (!isValid) {
    showStatus('Invalid vault path', true);
    return;
  }

  // Parse links
  const links = linksInput.value
    .split('\n')
    .map(url => url.trim())
    .filter(url => url && url.startsWith('http'));

  if (links.length === 0) {
    showStatus('No valid links to process', true);
    return;
  }

  try {
    processLinksButton.disabled = true;
    const results = await processLinks(
      links.map(url => ({ url, title: url })),
      config
    );
    
    await saveConfig();
    
    const successCount = results.filter(r => r.success).length;
    showStatus(`Processed ${successCount} of ${links.length} links successfully`);
  } catch (error) {
    showStatus('Failed to process links', true);
  } finally {
    processLinksButton.disabled = false;
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', loadConfig);

vaultPathInput.addEventListener('change', saveConfig);
closeTabsCheckbox.addEventListener('change', saveConfig);

getTabsButton.addEventListener('click', handleGetTabs);
processLinksButton.addEventListener('click', handleProcessLinks);

// Drag and drop support
linksInput.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

linksInput.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  const text = e.dataTransfer?.getData('text');
  if (text) {
    linksInput.value = text;
  }
}); 