// Setup file for Jest
// This file runs before each test file

// Mock console methods to reduce noise in test output
global.console = {
  ...console,
  // Uncomment to suppress warnings/errors in tests
  // warn: jest.fn(),
  // error: jest.fn(),
};
