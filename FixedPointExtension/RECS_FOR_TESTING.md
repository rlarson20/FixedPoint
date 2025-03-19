# Testing Infrastructure Recommendations

## Current State

### Unit Tests
- ✅ URL utility tests are working correctly
- ✅ Basic test setup is in place
- ✅ Jest configuration is properly set up

### Component Tests
- ❌ Issues with browser polyfill in React component tests
- ❌ Browser extension environment mocking needs improvement
- ❌ React Testing Library setup needs refinement

### E2E Tests
- ❌ Playwright tests being incorrectly picked up by Bun's test runner
- ❌ Need better separation between unit and E2E tests
- ❌ Browser extension specific E2E testing infrastructure needed

## Recommendations

### 1. Component Testing Improvements
- Create a dedicated test environment for React components
- Consider using `jest-environment-jsdom` with custom setup
- Implement proper browser extension API mocking
- Add React Testing Library utilities and custom matchers

### 2. E2E Testing Infrastructure
- Separate E2E tests into their own directory structure
- Use `web-ext` for browser extension testing
- Configure Playwright specifically for extension testing
- Create separate test runner configurations for unit and E2E tests

### 3. Test Organization
- Move all test files to a dedicated `__tests__` directory
- Create separate test setup files for different test types
- Implement proper test utilities and helpers
- Add test coverage reporting

### 4. Browser Extension Mocking
- Create a comprehensive mock for browser extension APIs
- Implement proper async/await support in mocks
- Add type safety to mocks
- Create reusable mock implementations

## Next Steps

1. Fix Component Tests
   - Update test environment configuration
   - Implement proper browser extension mocking
   - Add React Testing Library setup

2. Set up E2E Testing
   - Configure Playwright for extension testing
   - Create separate test runner configuration
   - Implement basic E2E test suite

3. Improve Test Organization
   - Reorganize test files
   - Create test utilities
   - Set up coverage reporting

4. Enhance Mocking
   - Create comprehensive browser API mocks
   - Add type safety
   - Implement async support

## Technical Details

### Current Configuration
- Using Bun as test runner
- Jest for unit and component tests
- Playwright for E2E tests
- TypeScript for type safety

### Dependencies
- @testing-library/react
- @testing-library/jest-dom
- @playwright/test
- webextension-polyfill
- jest-environment-jsdom

### File Structure
```
src/
  __tests__/
    unit/
    components/
  test/
    setup.ts
    mocks/
e2e/
  tests/
```

## Notes
- Consider using `web-ext` for more accurate browser extension testing
- May need to update TypeScript configurations for different test types
- Consider implementing custom test matchers for browser extension specific assertions 