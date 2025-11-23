// ============================================
// Firebase Service
// ============================================
// Service tổng hợp để tương tác với Firebase
// - Authentication
// - Firestore Database
// - Error Handling
// ============================================

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import type { User, LoginCredentials, RegisterData } from '@/types/models';

/**
 * Firebase Authentication Service
 */
export class FirebaseAuthService {
  /**
   * Đăng nhập bằng email và password
   */
  static async signInWithEmail(
    credentials: LoginCredentials
  ): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
      return userCredential;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Đăng ký tài khoản mới
   */
  static async signUpWithEmail(
    data: RegisterData
  ): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password
      );

      // Cập nhật display name
      if (data.name && userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: data.name,
        });
      }

      // Gửi email xác thực
      await this.sendVerificationEmail();

      return userCredential;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Đăng xuất
   */
  static async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Gửi email xác thực
   */
  static async sendVerificationEmail(): Promise<void> {
    try {
      const user = auth().currentUser;
      if (user && !user.emailVerified) {
        await user.sendEmailVerification();
      }
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Gửi email reset password
   */
  static async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Đổi password
   */
  static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = auth().currentUser;
      if (!user || !user.email) {
        throw new Error('No user logged in');
      }

      // Re-authenticate user
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);

      // Update password
      await user.updatePassword(newPassword);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Cập nhật profile
   */
  static async updateProfile(data: {
    displayName?: string;
    photoURL?: string;
  }): Promise<void> {
    try {
      const user = auth().currentUser;
      if (!user) {
        throw new Error('No user logged in');
      }
      await user.updateProfile(data);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Lấy current user
   */
  static getCurrentUser(): FirebaseAuthTypes.User | null {
    return auth().currentUser;
  }

  /**
   * Lắng nghe thay đổi auth state
   */
  static onAuthStateChanged(
    callback: (user: FirebaseAuthTypes.User | null) => void
  ): () => void {
    return auth().onAuthStateChanged(callback);
  }

  /**
   * Xử lý lỗi Firebase Auth
   */
  private static handleAuthError(error: any): Error {
    const errorCode = error.code;
    let message = 'Authentication error';

    switch (errorCode) {
      case 'auth/email-already-in-use':
        message = 'Email này đã được sử dụng';
        break;
      case 'auth/invalid-email':
        message = 'Email không hợp lệ';
        break;
      case 'auth/weak-password':
        message = 'Mật khẩu quá yếu';
        break;
      case 'auth/user-not-found':
        message = 'Không tìm thấy tài khoản';
        break;
      case 'auth/wrong-password':
        message = 'Mật khẩu không đúng';
        break;
      case 'auth/too-many-requests':
        message = 'Quá nhiều yêu cầu. Vui lòng thử lại sau';
        break;
      case 'auth/network-request-failed':
        message = 'Lỗi kết nối mạng';
        break;
      default:
        message = error.message || 'Đã xảy ra lỗi';
    }

    return new Error(message);
  }
}

/**
 * Firebase Firestore Service
 */
export class FirebaseFirestoreService {
  /**
   * Collections
   */
  static readonly COLLECTIONS = {
    USERS: 'users',
    RESTAURANTS: 'restaurants',
    MENUS: 'menus',
    ORDERS: 'orders',
    TABLES: 'tables',
  };

  /**
   * Tạo hoặc cập nhật user document
   */
  static async setUserDocument(
    uid: string,
    data: Partial<User>
  ): Promise<void> {
    try {
      await firestore()
        .collection(this.COLLECTIONS.USERS)
        .doc(uid)
        .set(
          {
            ...data,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  /**
   * Lấy user document
   */
  static async getUserDocument(uid: string): Promise<User | null> {
    try {
      const doc = await firestore()
        .collection(this.COLLECTIONS.USERS)
        .doc(uid)
        .get();

      if (!doc.exists) {
        return null;
      }

      return { id: doc.id, ...doc.data() } as User;
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  /**
   * Cập nhật user document
   */
  static async updateUserDocument(
    uid: string,
    data: Partial<User>
  ): Promise<void> {
    try {
      await firestore()
        .collection(this.COLLECTIONS.USERS)
        .doc(uid)
        .update({
          ...data,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  /**
   * Xóa document
   */
  static async deleteDocument(
    collection: string,
    docId: string
  ): Promise<void> {
    try {
      await firestore().collection(collection).doc(docId).delete();
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  /**
   * Lấy collection
   */
  static collection(
    name: string
  ): FirebaseFirestoreTypes.CollectionReference {
    return firestore().collection(name);
  }

  /**
   * Batch write
   */
  static batch(): FirebaseFirestoreTypes.WriteBatch {
    return firestore().batch();
  }

  /**
   * Server timestamp
   */
  static get serverTimestamp(): FirebaseFirestoreTypes.FieldValue {
    return firestore.FieldValue.serverTimestamp();
  }

  /**
   * Xử lý lỗi Firestore
   */
  private static handleFirestoreError(error: any): Error {
    const errorCode = error.code;
    let message = 'Database error';

    switch (errorCode) {
      case 'permission-denied':
        message = 'Không có quyền truy cập';
        break;
      case 'unavailable':
        message = 'Dịch vụ tạm thời không khả dụng';
        break;
      case 'not-found':
        message = 'Không tìm thấy dữ liệu';
        break;
      default:
        message = error.message || 'Đã xảy ra lỗi database';
    }

    return new Error(message);
  }
}

/**
 * Firebase Helper Functions
 */
export const FirebaseHelpers = {
  /**
   * Convert Firebase user to app User type
   */
  convertFirebaseUser(firebaseUser: FirebaseAuthTypes.User): Partial<User> {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      phone: firebaseUser.phoneNumber || '',
      avatar: firebaseUser.photoURL || undefined,
      createdAt: firebaseUser.metadata.creationTime || '',
      updatedAt: firebaseUser.metadata.creationTime || '',
      // Note: role sẽ được set từ Firestore document
    };
  },

  /**
   * Format Firestore timestamp
   */
  formatTimestamp(
    timestamp: FirebaseFirestoreTypes.Timestamp | undefined
  ): string {
    if (!timestamp) return '';
    return timestamp.toDate().toISOString();
  },
};

/**
 * USAGE EXAMPLES:
 * 
 * 1. Authentication:
 * ```typescript
 * // Đăng ký
 * const userCredential = await FirebaseAuthService.signUpWithEmail({
 *   email: 'user@example.com',
 *   password: 'password123',
 *   name: 'John Doe'
 * });
 * 
 * // Đăng nhập
 * const result = await FirebaseAuthService.signInWithEmail({
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 * 
 * // Lắng nghe auth state
 * const unsubscribe = FirebaseAuthService.onAuthStateChanged((user) => {
 *   if (user) {
 *     console.log('User logged in:', user.email);
 *   } else {
 *     console.log('User logged out');
 *   }
 * });
 * ```
 * 
 * 2. Firestore:
 * ```typescript
 * // Lưu user data
 * await FirebaseFirestoreService.setUserDocument(userId, {
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   role: 'admin'
 * });
 * 
 * // Lấy user data
 * const user = await FirebaseFirestoreService.getUserDocument(userId);
 * 
 * // Query collection
 * const restaurants = await FirebaseFirestoreService
 *   .collection('restaurants')
 *   .where('active', '==', true)
 *   .get();
 * ```
 */
