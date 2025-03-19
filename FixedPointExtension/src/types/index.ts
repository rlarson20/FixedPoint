export interface Config {
  vaultPath: string;
  closeTabs: boolean;
}

export interface Link {
  url: string;
  title: string;
  favicon?: string;
}

export interface ProcessResult {
  success: boolean;
  message: string;
  notePath?: string;
}

export interface VaultNode {
  name: string;
  path: string;
  children: VaultNode[];
  isFile: boolean;
  content?: string;
  metadata?: Record<string, any>;
} 