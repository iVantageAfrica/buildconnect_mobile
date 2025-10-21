import React, { useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { useFonts, WorkSans_400Regular, WorkSans_500Medium, WorkSans_600SemiBold, WorkSans_800ExtraBold} from '@expo-google-fonts/work-sans';
import {  Inter_400Regular } from '@expo-google-fonts/inter';
import colors from "../../constants/colors"
import string from "../../constants/strings"
import { SplashImage } from '@/src/constants/image';

export default function SplashScreen({ navigation }: any) {
  

  useEffect(() => {
      const timeout = setTimeout(() => {
        navigation.replace('Onboarding');
      }, 2000);

      return () => clearTimeout(timeout);
  
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
        fontFamily: 'WorkSans_400Regular'
      }}> 
        {string.splash_description} 
      </Text>
    </View>
  );
}