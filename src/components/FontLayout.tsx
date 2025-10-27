import React from "react";
import { useFonts, WorkSans_400Regular, WorkSans_500Medium, WorkSans_600SemiBold, WorkSans_800ExtraBold } from "@expo-google-fonts/work-sans";
import { Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import SplashScreen from "../screens/onboarding/SplashScreen";

export default function FontLayout({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
