import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 4000); 
  }, []);

  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>;
}
