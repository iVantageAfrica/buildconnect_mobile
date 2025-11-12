import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OTPInput from "@/src/components/Forms/OtpInput";
import { arrowleft } from "@/src/constants/icon";
import { useAuth } from "@/src/core/hooks/useAuth";
import GradientButton from "@/src/components/Buttons/GradientButton";
import KeyboardAvoidingLayout from "@/src/components/Layouts/KeyboardAvoidLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import AuthLink from "@/src/components/Miscallaneous/AuthLink";

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type VerifyEmailScreenProps = NativeStackScreenProps<RootStackParamList, "VerifyEmail">;

export default function VerifyEmailScreen({ navigation, route }: VerifyEmailScreenProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const { verifyOTPMutation, resendOtpMutation } = useAuth();
  const email = route.params?.email || "";
  const role = route.params?.role || "builder";
  const fromLogin = route.params?.fromLogin || false;

  console.log("email", email);
  console.log("role", role);
  console.log("fromLogin", fromLogin);

  const onSubmit = (data: any) => {
    verifyOTPMutation.mutate({ email, otp: data.otp, role, fromLogin });
  };

  const resendOtp = () => {
    resendOtpMutation.mutate({ email });
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Fallback if there's no previous screen
      navigation.navigate("SignUp");
    }
  };

  return (
    <KeyboardAvoidingLayout>
      <View className="mx-3">
        <TouchableOpacity className="pt-10 pl-4" onPress={() => handleBack()}>
          <Image
            source={arrowleft}
            resizeMode="contain"
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <View className="">
          <Text className="font-interbold text-center text-3xl py-8">
            Verify Your Email
          </Text>
          <Text className="font-inter text-center  text-xl py-4">
            A 6-digit code was sent to your registered email address.
          </Text>
        </View>
        <View className="pt-10">
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <OTPInput length={6} value={value} onChange={onChange} />
            )}
          />

          {errors.otp && (
            <Text className="text-red-500 text-center mt-3">
              {errors.otp.message}
            </Text>
          )}
        </View>

        <View className="pt-20">
          <GradientButton
            loading={verifyOTPMutation.isPending}
            title="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View className="pt-3">
          <AuthLink
            questionText="Didnt get  OTP? "
            linkText="Resend OTP"
            onPress={resendOtp}
            className="justify-center "
            questionClassName="text-black text-md"
            linkClassName="text-primary font-interbold "
          />
        </View>
      </View>
    </KeyboardAvoidingLayout>
  );
}
