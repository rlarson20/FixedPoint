import { describe, expect, test } from 'bun:test';

describe('URL Utilities', () => {
  test('should extract domain from URL', () => {
    const url = 'https://example.com/path/to/page';
    const domain = url.split('//')[1].split('/')[0];
    expect(domain).toBe('example.com');
  });

  test('should handle URLs without protocol', () => {
    const url = 'example.com/path/to/page';
    const domain = url.split('/')[0];
    expect(domain).toBe('example.com');
  });

  test('should handle URLs with subdomains', () => {
    const url = 'https://sub.example.com/path';
    const domain = url.split('//')[1].split('/')[0];
    expect(domain).toBe('sub.example.com');
  });
}); 