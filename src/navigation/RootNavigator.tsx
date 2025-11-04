import React, { useEffect, useState } from 'react';
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
import TabNavigator from './TabNavigator';
import { useAuthStore } from '@/src/store/Authstore';
import NotificationScreen from '../screens/builders/notification/notification';
import FindprojectsScreen from '../screens/builders/findprojects/findprojects';
import MyprojectsScreen from '../screens/builders/myprojects/myprojects';
import ProjectDetailsScreen from '../screens/builders/projectdetails/projectdetails';
import SubmitBidScreen from '../screens/builders/submitbid/submitbid';
import CreateProperty from '../screens/builders/createproperty/createproperty';
import Contractdetails from '../screens/builders/contractdetails/contractdetails';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  GetStarted: undefined;
  Profile: undefined;
  ForgotPassword: undefined;
  OtpFormScreen: undefined;
  Dashboard: undefined;
  Notification: undefined;
  FindProjects:undefined;
  MyProjects:undefined;
  ProjectDetails:undefined;
  SubmitBid:undefined;
  CreateProperty:undefined;
  ContractDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLogin } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      await new Promise((res) => setTimeout(res, 200));
      setLoading(false);
    };
    loadAuth();
  }, []);

  if (loading) return <SplashScreen/>; 

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLogin ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="OtpFormScreen" component={OTPFormScreen} />
        
        </>
      ) : (
        <>
            <Stack.Screen name="Dashboard" component={TabNavigator} />
             <Stack.Screen name="Notification" component={NotificationScreen} />
              <Stack.Screen name="FindProjects" component={FindprojectsScreen} />
              <Stack.Screen name="MyProjects" component={MyprojectsScreen} />
              <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
              <Stack.Screen name="SubmitBid" component={SubmitBidScreen} />
              <Stack.Screen name="CreateProperty" component={CreateProperty} />
               <Stack.Screen name="ContractDetails" component={Contractdetails} />
        </>
      )}
    </Stack.Navigator>
  );
}
