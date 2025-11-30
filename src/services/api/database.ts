import database from '@react-native-firebase/database';

export const saveUserProfile = async (
  uid: string,
  profile: {
    fullName: string;
    birthDate: string;
    gender: string;
    email: string;
  },
) => {
  try {
    await database().ref(`/users/${uid}`).set(profile);
  } catch (error) {
    console.error('Failed to save user profile:', error);
    throw error;
  }
};
