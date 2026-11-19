import '@testing-library/jest-dom';

// Stub window.scrollTo for jsdom environment
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
}
