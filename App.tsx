/**
 * MiniRestaurantPro
 * React Native Restaurant Management App
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from '@navigation';
import './src/i18n'; // Initialize i18n

// Firebase imports - uncomment when ready to use
// import { FirebaseAuthService } from '@/services/firebase';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Initialize Firebase and check auth state
    const initializeApp = async () => {
      try {
        // Firebase automatically initializes with google-services.json / GoogleService-Info.plist

        // Optional: Listen to auth state changes
        // const unsubscribe = FirebaseAuthService.onAuthStateChanged((user) => {
        //   console.log('Auth state changed:', user?.email);
        // });

        setIsInitializing(false);

        // Cleanup function
        // return () => unsubscribe?.();
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  // Show loading screen while initializing
  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="#fff"
        />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
