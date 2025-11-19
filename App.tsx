import React, { useEffect } from "react";
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import colors from "./src/constants/colors";
import Toast from 'react-native-toast-message';
import createToastConfig from "./src/components/Notifications/Toast";
import "./global.css";

import FontLayout from "./src/components/Layouts/FontLayout";
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
        <View style={{ flex: 1, backgroundColor: colors.text_primary }}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <Toast config={toastConfig} />
        </View>
        </FontLayout>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
