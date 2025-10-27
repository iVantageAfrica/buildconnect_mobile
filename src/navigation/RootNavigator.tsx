import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboarding/Onboarding';
import SplashScreen from '../screens/onboarding/SplashScreen';
import SignInScreen from '../screens/auth/sign_in/signin';
import ResetPasswordScreen from '../screens/auth/forgot_password/ResetPasswordScreen';
import GetStarted from '../screens/onboarding/GetStarted';
import SignUpScreen from '../screens/auth/sign_up/sign_up';
import ProfileScreen from '../screens/auth/profile_setup/profile';
import ForgotPasswordScreen from '../screens/auth/forgot_password/ForgotPasswordScreen';
import OTPFormScreen from '../screens/auth/forgot_password/OtpFormScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  GetStarted:undefined;
  Profile:undefined;
  ForgotPassword:undefined;
  OtpFormScreen:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
      <Stack.Screen name="OtpFormScreen" component={OTPFormScreen}/>
    </Stack.Navigator>
  );
}
