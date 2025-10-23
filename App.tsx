import React from "react";
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import colors from "./src/constants/colors";
import Toast from 'react-native-toast-message';
import createToastConfig from "./src/components/Toast";
import { useFonts, WorkSans_400Regular, WorkSans_500Medium, WorkSans_600SemiBold, WorkSans_800ExtraBold } from "@expo-google-fonts/work-sans";
import { Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import "./global.css";
import SplashScreen from "./src/screens/onboarding/SplashScreen";
const queryClient = new QueryClient();

const toastConfig = createToastConfig({
  titleFont: 'Inter_700Bold',
  subtitleFont: 'Inter_500Medium',
});

export default function App() {
  const [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_800ExtraBold 
  });
  
if (!fontsLoaded) {
  return <SplashScreen/>; 
}
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary_color }} edges={["top", "left", "right", "bottom"]}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <Toast config={toastConfig} />
        </SafeAreaView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
