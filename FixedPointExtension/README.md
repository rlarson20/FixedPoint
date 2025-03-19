# FixedPoint Firefox Extension

A Firefox extension that helps you save browser links to your Obsidian vault.

## Features

- Save browser tabs to Obsidian notes
- Manual URL entry
- Drag and drop URL support
- Automatic note creation and linking
- Configurable vault path
- Option to close tabs after processing

## Development

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firefox Developer Edition (for testing)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   ./build.sh
   ```

### Development Workflow

1. Make changes to the source files in the `src` directory
2. Run the build script to compile and copy files:
   ```bash
   ./build.sh
   ```
3. Load the extension in Firefox:
   - Open Firefox
   - Navigate to `about:debugging`
   - Click "This Firefox" in the sidebar
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file from the `dist` directory

## Project Structure

```
FixedPointExtension/
├── src/
│   ├── popup/           # Popup UI files
│   ├── background/      # Background script
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── dist/               # Compiled extension files
├── manifest.json       # Extension manifest
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── build.sh           # Build script
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
