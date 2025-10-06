import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import colors from "../../constants/colors"
import string from "../../constants/strings"
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      //navigation.replace('Onboarding');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

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

      <Text style={{ marginTop: 1, color: colors.color_white}}> {string.splash_description} </Text>
    </View>
  );
}
