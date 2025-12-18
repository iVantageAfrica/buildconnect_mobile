import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboarding/Onboarding';
import SplashScreen from '../screens/onboarding/SplashScreen';
import SignInScreen from '../screens/auth/sign_in/signin';
import ResetPasswordScreen from '../screens/auth/forgot_password/ResetPasswordScreen';
import GetStarted from '../screens/onboarding/GetStarted';
import SignUpScreen from '../screens/auth/sign_up/sign_up';
import BasicInfoScreen from '../screens/auth/sign_up/builder/BasicInfoScreen';
import ProfessionalDocsScreen from '../screens/auth/sign_up/builder/ProfessionalDocsScreen';
import ServicesScreen from '../screens/auth/sign_up/builder/ServicesScreen';
import PortfolioScreen from '../screens/auth/sign_up/builder/PortfolioScreen';
import ProfileSuccessScreen from '../screens/auth/sign_up/builder/ProfileSuccessScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';
import SupportScreen from '../screens/clients/support/support';
import ForgotPasswordScreen from '../screens/auth/forgot_password/ForgotPasswordScreen';
import OTPFormScreen from '../screens/auth/forgot_password/OtpFormScreen';
import VerifyEmailScreen from '../screens/auth/sign_up/verify_email';
import VerifyIdentityScreen from '../screens/auth/sign_up/client/verify_identity';
import CreateProjectScreen from '../screens/auth/sign_up/client/create_project';
import AccountSuccessScreen from '../screens/auth/sign_up/client/AccountSuccessScreen';
import TabNavigator from './TabNavigator';
import { useAuthStore } from '@/src/store/Authstore';
import NotificationScreen from '../screens/builders/notification/notification';
import FindprojectsScreen from '../screens/builders/findprojects/findprojects';
import MyprojectsScreen from '../screens/builders/myprojects/myprojects';
import ProjectDetailsScreen from '../screens/builders/projectdetails/projectdetails';
import SubmitBidScreen from '../screens/builders/submitbid/submitbid';
import CreateProperty from '../screens/builders/createproperty/createproperty';
import Contractdetails from '../screens/builders/contractdetails/contractdetails';
import AddProject from '../screens/clients/projects/addproject';
import ClientProjectDetails from '../screens/clients/clientprojects/clientprojectdetails';
import ClosedProjects from '../screens/clients/closeprojects/closeprojects';
import comparebids from '../screens/clients/comparebids/comparebids';
import Inviteprofilescreen from '../screens/clients/inviteprofilescreen/inviteprofilescreen';
import Proposalscreen from '../screens/clients/proposalscreen/proposalscreen';
import contractscreen from '../screens/clients/contractscreen/contractscreen';
import Revisionscreen from '../screens/clients/revisionscreen/revisionscreen';
import ClientContractdetailsScreen from '../screens/clients/contractscreen/contractscreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: { selectedRole?: string } | undefined;
  ResetPassword: { email?: string; otp?: string } | undefined;
  GetStarted: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Support: undefined;
  ForgotPassword: undefined;
  OtpFormScreen: { email?: string } | undefined;
  Dashboard: undefined;
  Notification: undefined;
  VerifyEmail: { email?: string; role?: string; fromLogin?: boolean } | undefined;
  VerifyIdentity: undefined;
  CreateProject: undefined;
  AccountSuccess: undefined;
  FindProjects: undefined;
  MyProjects: undefined;
  BuilderBasicInfo: undefined;
  BuilderProfessionalDocs: undefined;
  BuilderServices: undefined;
  BuilderPortfolio: undefined;
  BuilderProfileSuccess: undefined;
  SubmitBid: undefined;
  CreateProperty: undefined;
  ContractDetails: undefined;
  AddProject:undefined;
 ClientProjectDetails:undefined;
 ClosedProjects:undefined;
 CompareBidsScreen:undefined;
 RevisionBidsScreen:undefined;
 InviteProfileScreen: {
    contractorId: string; 
  };
  ProjectDetails: {
    projectId: string; 
  };
 ProposalScreen: {
    bidId: string; 
  };
  ClientContractdetailsScreen:undefined;
  RevisionScreen:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLogin, loadAuthData } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      await loadAuthData();
      await new Promise((res) => setTimeout(res, 200));
      setLoading(false);
    };
    loadAuth();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      {!isLogin ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="VerifyIdentity" component={VerifyIdentityScreen} />
          <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="BuilderBasicInfo" component={BasicInfoScreen} />
          <Stack.Screen name="BuilderProfessionalDocs" component={ProfessionalDocsScreen} />
          <Stack.Screen name="BuilderServices" component={ServicesScreen} />
          <Stack.Screen name="BuilderPortfolio" component={PortfolioScreen} />
          <Stack.Screen name="BuilderProfileSuccess" component={ProfileSuccessScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="OtpFormScreen" component={OTPFormScreen} />
        </>
      ) : (
        <>
        
          <Stack.Screen name="Dashboard" component={TabNavigator} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="VerifyIdentity" component={VerifyIdentityScreen} />
          <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
          <Stack.Screen name="AccountSuccess" component={AccountSuccessScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="FindProjects" component={FindprojectsScreen} />
          <Stack.Screen name="MyProjects" component={MyprojectsScreen} />
          <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
          <Stack.Screen name="SubmitBid" component={SubmitBidScreen} />
          <Stack.Screen name="CreateProperty" component={CreateProperty} />
          <Stack.Screen name="ContractDetails" component={Contractdetails} />
          <Stack.Screen name="BuilderBasicInfo" component={BasicInfoScreen} />
          <Stack.Screen name="BuilderProfessionalDocs" component={ProfessionalDocsScreen} />
          <Stack.Screen name="BuilderServices" component={ServicesScreen} />
          <Stack.Screen name="BuilderPortfolio" component={PortfolioScreen} />
          <Stack.Screen name="BuilderProfileSuccess" component={ProfileSuccessScreen} />
          <Stack.Screen name="AddProject" component={AddProject}/>
          <Stack.Screen name="ClientProjectDetails" component={ClientProjectDetails}/>
           <Stack.Screen name="CompareBidsScreen" component={comparebids}/>
          <Stack.Screen name="InviteProfileScreen" component={Inviteprofilescreen}/>
          <Stack.Screen name="ProposalScreen" component={Proposalscreen}/>
          <Stack.Screen name="ClientContractdetailsScreen" component={ClientContractdetailsScreen}/>
          <Stack.Screen name="RevisionScreen" component={Revisionscreen}/>
        </>
      )}
    </Stack.Navigator>
  );
}
