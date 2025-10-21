import { useAuthStore } from "@/src/store/Authstore";
import { AuthService } from "../services/auth/AuthService";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";


export const useAuth = () => {
  const { setAuthData } = useAuthStore();

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

  return {
    loginMutation,
  };
};
