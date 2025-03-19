import type { Config, Link, ProcessResult } from '../types';

const API_BASE_URL = 'http://localhost:5000';

export async function processLinks(links: Link[], config: Config): Promise<ProcessResult[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vault_path: config.vaultPath,
        links,
        close_tabs: config.closeTabs,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing links:', error);
    throw error;
  }
}

export async function validateVaultPath(vaultPath: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/validate-vault`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vault_path: vaultPath }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error validating vault path:', error);
    return false;
  }
} 