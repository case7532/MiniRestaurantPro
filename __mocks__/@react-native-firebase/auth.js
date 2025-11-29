module.exports = {
  default: () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn((callback) => {
      // Call callback with null user initially
      callback(null);
      // Return unsubscribe function
      return jest.fn();
    }),
  }),
};
