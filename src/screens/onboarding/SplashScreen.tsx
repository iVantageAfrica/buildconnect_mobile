import React, { useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { useFonts, WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import colors from "../../constants/colors"
import string from "../../constants/strings"

export default function SplashScreen({ navigation }: any) {
  const [fontsLoaded] = useFonts({
    WorkSans_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timeout = setTimeout(() => {
        navigation.replace('Onboarding');
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [navigation, fontsLoaded]);



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: colors.primary_color }}>
      <Image 
        source={require('../../assets/images/splash-icon.png')}
        style={{
          width: 300,
          height: 100
        }}
        resizeMode="contain"
      />

      <Text style={{ 
        marginTop: 1, 
        color: colors.color_white,
        fontFamily: 'WorkSans_400Regular'
      }}> 
        {string.splash_description} 
      </Text>
    </View>
  );
}