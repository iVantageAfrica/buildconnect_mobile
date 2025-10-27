import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { arrowleft } from "@/src/constants/icon";
import GradientButton from "@/src/components/Buttons/GradientButton";
import KeyboardAvoidingLayout from "@/src/components/KeyboardAvoidLayout";
import {ResetPasswordInput, resetPasswordSchema } from "@/src/schemas/authschema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/src/core/hooks/useAuth";
import PasswordInput from "@/src/components/Forms/PasswordInput";
import SuccessScreen from "@/src/components/SucessScreen";

const ResetPasswordScreen = ({ navigation }: any) => {
  const handleBack = () => {
    navigation.replace("SignIn");
  };


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword:""
    },
  });
 
  const {ResetPasswordMutation, resetSuccess} = useAuth();

  const onSubmit = (data: ResetPasswordInput) => {
   ResetPasswordMutation.mutate(data);
  };
if(resetSuccess){
   return (
      <SuccessScreen
  title="Password Reset Successfully!"
  message="Congratulations! Your Password Reset Is Successful. Log In With Your New Password And Continue Your Journey."
  navigateTo="SignIn"
  buttonTitle="Login"
 />
  )
}
  return (
    <KeyboardAvoidingLayout>
      <View>
        <TouchableOpacity className="pt-10 pl-4" onPress={() => handleBack()}>
          <Image
            source={arrowleft}
            resizeMode="contain"
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <View className="">
          <Text className="font-interbold text-center text-3xl py-8">Password Reset</Text>
                    <Text className="font-inter text-center text-xl py-4">Enter your new password to reset your account</Text>
        </View>
        <View className="mx-4 space-y-4 pt-10">
            <View className="pb-2">
            <Controller
              control={control}
              name="newPassword"
              render={({ field }) => (
                <PasswordInput
                  placeholder="New Password"
                  label="New Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  hasError={!!errors.newPassword}
                />
              )}
            />
            {errors.newPassword && (
              <Text className="font-inter pt-1 text-red-500 text-sm">
                {errors.newPassword.message}
              </Text>
            )}
          </View>

             <View className="pb-2">
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <PasswordInput
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  hasError={!!errors.confirmPassword}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="font-inter pt-1 text-red-500 text-sm">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          <View className="pt-8">
            <GradientButton loading={ResetPasswordMutation.isPending} title="Continue" onPress={handleSubmit(onSubmit)} />
          </View>

        </View>
      </View>
    </KeyboardAvoidingLayout>
  );
};

export default ResetPasswordScreen;
