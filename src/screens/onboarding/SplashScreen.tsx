import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from "../../constants/colors"
import string from "../../constants/strings"
import { SplashImage } from '@/src/constants/image';
import type { RootStackParamList } from '@/src/navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SplashScreen({ navigation: navigationProp }: { navigation?: NavigationProp }) {
  const navigationHook = useNavigation<NavigationProp>();
  const navigation = navigationProp || navigationHook;

  useEffect(() => {
    if (navigation && typeof navigation.replace === 'function') {
      const timeout = setTimeout(() => {
        navigation.replace('Onboarding');
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center p-16 bg-primary">
      <Image 
        source={SplashImage}
        style={{
          width: 300,
          height: 100
        }}
        resizeMode="contain"
      />

      <Text className="mt-1 text-white font-work-sans" style={{ 
        marginTop: 1, 
        color: colors.color_white,
      }}> 
        {string.splash_description} 
      </Text>
    </View>
  );
}