#!/bin/bash

# Create dist directory
mkdir -p dist

# Copy static files
cp src/popup/popup.html dist/
cp manifest.json dist/

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  bun install
fi

# Build TypeScript files
bun run build

# Create icons directory if it doesn't exist
mkdir -p dist/icons

# Copy icons (you'll need to add your own icons)
# cp icons/icon-48.png dist/icons/
# cp icons/icon-96.png dist/icons/

echo "Build complete! Extension files are in the dist directory." 