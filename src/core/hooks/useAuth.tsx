import { useAuthStore } from "@/src/store/Authstore";
import { useNavigation } from "@react-navigation/native";
import { AuthService } from "../services/auth/AuthService";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";


export const useAuth = () => {
  const { setAuthData } = useAuthStore();
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (res: any) => {
      const loginData = res?.data;
      if (
        (loginData.statusCode === 200 || loginData.statusCode === 201) &&
        loginData.success === true
      ) {
        const { authToken, refreshToken } = loginData.data;
        setAuthData(authToken, refreshToken);
        Alert.alert("Login Sucessful");
      }
    },
    onError: (error: any) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error instanceof Error ? error.message : "Invalid credentials",
      });
    },
  });

   const registerMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (res: any) => {
      const registerData = res?.data;
      if (
        (registerData.statusCode === 200 || registerData.statusCode === 201) &&
        registerData.success === true
      ) {
        const { authToken, refreshToken } = registerData.data;
        setAuthData(authToken, refreshToken);
        Alert.alert("Login Sucessful");
      }
    },
    onError: (error: any) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error instanceof Error ? error.message : "Invalid credentials",
      });
      navigation.replace("Profile")
    },
  });

   const forgotPassMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (res: any) => {
      const registerData = res?.data;
      if (
        (registerData.statusCode === 200 || registerData.statusCode === 201) &&
        registerData.success === true
      ) {
        const { authToken, refreshToken } = registerData.data;
        setAuthData(authToken, refreshToken);
        Alert.alert("Login Sucessful");
      }
    },
    onError: (error: any) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Failed to email",
        text2: error instanceof Error ? error.message : "Invalid credentials",
      });
      navigation.replace("OtpFormScreen")
    },
  });

   const otpMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (res: any) => {
      const registerData = res?.data;
      if (
        (registerData.statusCode === 200 || registerData.statusCode === 201) &&
        registerData.success === true
      ) {
        const { authToken, refreshToken } = registerData.data;
        setAuthData(authToken, refreshToken);
        Alert.alert("Login Sucessful");
      }
    },
    onError: (error: any) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Failed to email",
        text2: error instanceof Error ? error.message : "Invalid credentials",
      });
      navigation.replace("ResetPassword")
    },
  });

    const ResetPasswordMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (res: any) => {
      const registerData = res?.data;
      if (
        (registerData.statusCode === 200 || registerData.statusCode === 201) &&
        registerData.success === true
      ) {
        const { authToken, refreshToken } = registerData.data;
        setAuthData(authToken, refreshToken);
        Alert.alert("Login Sucessful");
      }
    },
    onError: (error: any) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Failed to email",
        text2: error instanceof Error ? error.message : "Invalid credentials",
      });
      navigation.replace("ResetPasswordSucessScreen")
    },
  });

  

  return {
    loginMutation,
    registerMutation,
  forgotPassMutation,
    otpMutation,
    ResetPasswordMutation

  };
};
