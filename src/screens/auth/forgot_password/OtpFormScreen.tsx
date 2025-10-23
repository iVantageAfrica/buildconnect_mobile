import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OTPInput from "@/src/components/Forms/OtpInput";
import { arrowleft } from "@/src/constants/icon";
import { useAuth } from "@/src/core/hooks/useAuth";
import GradientButton from "@/src/components/Buttons/GradientButton";
import AuthLink from "@/src/components/AuthLink";

const otpSchema = z.object({
  otp: z.string().min(4, "OTP must be 4 digits"),
});

export default function OTPFormScreen({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const { otpMutation } = useAuth();
  const onSubmit = (data: any) => {
    console.log("✅ OTP Submitted:", data.otp);
      otpMutation.mutate(data);
  };
  const handleBack = () => {
    navigation.replace("ForgotPassword");
  };
  const resendOtp = () => {
    navigation.replace("ForgotPassword");
  };

 

  return (
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
          Enter OTP Code
        </Text>
        <Text className="font-inter text-center  text-xl py-4">
          We’ve sent a 4-digit code to your phone number/email address.
        </Text>
      </View>
      <View className="pt-4">
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, value } }) => (
            <OTPInput length={4} value={value} onChange={onChange} />
          )}
        />

        {errors.otp && (
          <Text className="text-red-500 text-center mt-3">
            {errors.otp.message}
          </Text>
        )}
      </View>

      <View className="pt-8">
        <GradientButton
          loading={otpMutation.isPending}
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
  );
}
