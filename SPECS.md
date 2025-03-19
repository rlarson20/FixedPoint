# Project Implementation Plan

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Firefox Extension Implementation](#firefox-extension-implementation)
3. [Server Implementation](#server-implementation)
4. [Link-to-Note Matching System](#link-to-note-matching-system)
5. [Vault Structure Parsing](#vault-structure-parsing)
6. [Error Handling & Edge Cases](#error-handling--edge-cases)
7. [Testing Strategy](#testing-strategy)
8. [Deployment Considerations](#deployment-considerations)

---

## Architecture Overview

**Component Diagram:**

[Firefox Extension] -> [Python Server] <-> [Obsidian Vault]

**Data Flow:**

1. User provides links/tabs and vault path via extension
2. Extension sends JSON payload to server API
3. Server processes vault structure and matches links to notes
4. Server creates/updates notes as needed
5. Extension closes tabs if requested

---

## Firefox Extension Implementation

### Tech Stack

- **Language:** TypeScript
- **Core Libraries:**
  - `webextension-polyfill` (cross-browser compatibility)
  - `react` (optional for complex UIs)
  - `@types/firefox-webext-browser` (type definitions)

### Key Features

1. **Input Modes:**
   - Textarea for manual URL entry
   - Current tabs selection via `browser.tabs.query()`
   - Drag-and-drop URL list support

2. **Vault Path Configuration:**
   - Store in `browser.storage.local`
   - Validation: Check path exists via server ping

3. **API Communication:**

   ```typescript
   fetch('http://localhost:5000/process', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       vault_path: config.vaultPath,
       links: cleanedLinks,
       close_tabs: closeTabsFlag
     })
   });
   ```

### Recommended UI Approach

Use browser-native HTML elements for simplicity:

```html
<!-- popup.html -->
<input type=\"text\" id=\"vault-path\">
<textarea id=\"links-input\"></textarea>
<button id=\"submit\">Process Links</button>
```

---

## Server Implementation

### Tech Stack

- **Framework:** Flask (lightweight, simple API routes)
- **Key Libraries:**
  - `Watchdog` (filesystem monitoring)
  - `python-frontmatter` (metadata parsing)
  - `scikit-learn` (TF-IDF vectorization)

### API Endpoints

```python
@app.route('/process', methods=['POST'])
def process_links():
    data = request.json
    vault_tree = build_vault_tree(data['vault_path'])
    results = []
    
    for link in data['links']:
        best_match = find_best_note_match(link, vault_tree)
        if best_match.score >= MIN_CONFIDENCE:
            update_note(best_match.note_path, link)
        else:
            new_note_path = create_note(best_match.folder_path, link)
        results.append(...)
    
    return jsonify(results)
```

---

## Link-to-Note Matching System

### Matching Strategies

| Approach | Complexity | Accuracy | Notes |
|----------|------------|----------|-------|
| Filename Keywords | Low | Medium | Match domain/keywords to note titles |
| TF-IDF Content | High | High | Needs full text parsing |
| Directory Heuristics | Medium | Low | Parent folder similarity |

**Recommended Hybrid Approach:**

1. First pass: Filename/keyword matching
2. Fallback: TF-IDF on note content
3. Final fallback: Directory similarity using path components

**Implementation Sketch:**

```python
def find_best_match(link: str, vault_tree: VaultNode) -> MatchResult:
    # Extract keywords from URL
    keywords = extract_keywords(link)
    
    # Search existing notes
    note_matches = search_notes(keywords)
    if high_confidence_match(note_matches):
        return note_matches[0]
    
    # Search directory structure
    directory_matches = search_directories(keywords)
    return best_directory_match(directory_matches)
```

---

## Vault Structure Parsing

### Representation Structure

```typescript
interface VaultNode {
  name: string;
  path: string;
  children: VaultNode[];
  is_file: boolean;
  content?: string;
  metadata?: Record<string, any>;
}
```

### Parsing Implementation

1. **File System Traversal:**

   ```python
   def build_vault_tree(root_path):
       root = VaultNode(name=os.path.basename(root_path), path=root_path)
       for entry in os.scandir(root_path):
           if entry.is_dir():
               node = build_vault_tree(entry.path)
           else:
               node = parse_note_file(entry.path)
           root.children.append(node)
       return root
   ```

2. **Note Parsing:**
   - Extract frontmatter metadata
   - Index first heading as title
   - Remove markdown formatting for content analysis

---

## Error Handling & Edge Cases

### Common Failure Points

1. **Invalid Vault Path:**
   - Server-side validation
   - Extension: Show validation feedback

2. **Permission Issues:**
   - Server: Run with appropriate privileges
   - Extension: Verify write access during setup

3. **Unreachable Links:**
   - Implement timeout/retry mechanism
   - Queue system for failed links

### Conflict Resolution

1. **Duplicate Links:**
   - MD5 hash checking before adding
   - Configurable duplicate handling (skip/append/data)

2. **Ambiguous Matches:**
   - Logging system for manual review
   - Threshold tuning via config file

---

## Testing Strategy

### Extension Testing

1. Unit Tests: Jest
   - Mock browser APIs using `jest-webextension-mock`
2. Integration Tests
   - Test API communication with local test server

### Server Testing

1. Pytest Framework
   - Mock filesystem using `pyfakefs`
2. Example Test Cases:

   ```python
   def test_note_creation():
       test_vault = create_temp_vault()
       result = process_link(\"https://example.com\", test_vault)
       assert os.path.exists(result.new_note_path)
   ```

---

## Deployment Considerations

### Distribution

1. **Extension:**
   - WebExt package for Firefox Add-ons store
   - Manual load via `about:debugging`

2. **Server:**
   - PyInstaller standalone executable
   - Systemd service for auto-start

### Security

1. Local-only operation recommended
2. If remote access needed:
   - JWT authentication
   - HTTPS enforcement

### Performance Optimization

1. Vault Tree Caching:
   - Invalidated only on vault changes
   - Use Watchdog for filesystem monitoring
2. Link Processing:
   - Batch processing vs. sequential
   - Async support with Celery

**Recommended Implementation Order:**

1. Server API with dummy matching logic
2. Basic extension UI
3. Vault parsing implementation
4. Matching algorithm iteration
5. Error handling and edge cases
6. Testing infrastructure
7. Documentation writing

**Key Library Choices Rationale:**

- **Flask** over Django: Lighter weight for simple API
- **Vanilla WebExtensions** over frameworks: Reduced complexity
- **Scikit-learn** for TF-IDF: Mature NLP implementation

**First-Milestone Goals:**

- Manual vault path input in extension
- Basic filename-based matching
- Note creation in root folder fallback
- Local server with hardcoded test vault

This plan emphasizes gradual iteration with multiple checkpoints to verify each component before system integration.
