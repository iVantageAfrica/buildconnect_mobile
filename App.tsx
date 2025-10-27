import React from "react";
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import colors from "./src/constants/colors";
import Toast from 'react-native-toast-message';
import createToastConfig from "./src/components/Toast";
import "./global.css";
import FontLayout from "./src/components/FontLayout";
const queryClient = new QueryClient();

const toastConfig = createToastConfig({
  titleFont: 'Inter_700Bold',
  subtitleFont: 'Inter_500Medium',
});

export default function App() {

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <FontLayout>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary_color }} edges={["top", "left", "right", "bottom"]}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <Toast config={toastConfig} />
        </SafeAreaView>
        </FontLayout>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
