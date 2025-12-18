import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from "expo-status-bar";
import colors from "./src/constants/colors";
import Toast from 'react-native-toast-message';
import createToastConfig from "./src/components/Notifications/Toast";
import "./global.css";
import { navigationRef } from "./src/core/services/navigation/NavigationService";

import FontLayout from "./src/components/Layouts/FontLayout";
const queryClient = new QueryClient();

const toastConfig = createToastConfig({
  titleFont: 'Inter_700Bold',
  subtitleFont: 'Inter_500Medium',
});

function AppContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.text_secondary }}>
      <StatusBar style="dark" translucent={Platform.OS === 'android'} />
      <View 
        style={{ 
          flex: 1,
          paddingTop: Platform.OS === 'android' ? insets.top : 0,
          paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
        }}
      >
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <FontLayout>
          {Platform.OS === 'ios' ? (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={["top", "bottom", "left", "right"]}>
              <NavigationContainer ref={navigationRef}>
                <RootNavigator />
              </NavigationContainer>
              <Toast config={toastConfig} />
            </SafeAreaView>
          ) : (
            <AppContent />
          )}
        </FontLayout>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}