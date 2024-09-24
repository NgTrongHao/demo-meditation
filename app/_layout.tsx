import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import TimerProvider from "@/context/TimerContext";

// Prevent the splash screen from auto-hiding until the fonts are loaded
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    if (!fontsLoaded || error) {
      return;
    }
  }, [fontsLoaded, error]);

  return (
    <TimerProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="meditate" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/adjust-meditation-duration"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
    </TimerProvider>
  );
};

export default RootLayout;
