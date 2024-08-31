import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AnimationScreen } from '../components/animation-screen';
import { tokenCache } from '../modules/auth/infrastructure/ClerkToken';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const baseUrl = process.env.EXPO_PUBLIC_SERVER_BASE_URL!;
const client = new ApolloClient({
  uri: `${baseUrl}/api/graphql`,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${baseUrl}/api/graphql`,
  }),
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
LogBox.ignoreLogs(['Clerk:']);
SplashScreen.preventAutoHideAsync();
NavigationBar.setVisibilityAsync('hidden');

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [loaded, error] = useFonts({
    Nunito: require('../../assets/fonts/Nunito-Regular.ttf'),
    NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf'),
    NunitoSemiBold: require('../../assets/fonts/Nunito-SemiBold.ttf'),
    NunitoExtraBold: require('../../assets/fonts/Nunito-ExtraBold.ttf'),
    NunitoLight: require('../../assets/fonts/Nunito-Light.ttf'),
    NunitoMedium: require('../../assets/fonts/Nunito-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();

      setAppReady(true);
    }
  }, [loaded]);

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    );
  }

  if (!appReady || !animationFinished) {
    return (
      <AnimationScreen
        appReady={appReady}
        finish={(isCancelled: boolean) => {
          if (!isCancelled) {
            setAnimationFinished(true);
          }
        }}
      />
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ApolloProvider client={client}>
          <Animated.View style={{ flex: 1 }} entering={FadeIn}>
            <Stack>
              <Stack.Screen
                name="index"
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen name="(root)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar backgroundColor="transparent" />
          </Animated.View>
        </ApolloProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
