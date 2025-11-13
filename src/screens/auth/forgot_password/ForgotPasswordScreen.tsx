import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { arrowleft } from "@/src/constants/icon";
import FormInput from "@/src/components/Forms/Formnput";
import GradientButton from "@/src/components/Buttons/GradientButton";
import KeyboardAvoidingLayout from "@/src/components/Layouts/KeyboardAvoidLayout";
import { ForgotPasswordInput, forgotPasswordSchema, LoginInput, loginSchema } from "@/src/schemas/authschema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/src/core/hooks/useAuth";

const ForgotPasswordScreen = ({ navigation }: any) => {
  const handleBack = () => {
    navigation.replace("SignIn");
  };

const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { forgotPasswordMutation } = useAuth();

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        navigation.replace("OtpFormScreen", { email: data.email });
      },
    });
  };

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
          <Text className="font-interbold text-center text-3xl py-8 mx-4">Password Recovery</Text>
          <Text className="font-inter text-center text-xl py-4">
          Enter the email address or phone number associated with your BuildConnect account. 
          </Text>
        </View>
        <View className="mx-4 space-y-4 pt-5">
          <View>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormInput
                  placeholder="user@gmail.com"
                  label="Email"
                  value={field.value}
                  hasError={!!errors.email}
                  onChangeText={field.onChange}
                />
              )}
            />

            {errors.email && (
              <Text className="font-inter text-xs  pt-2" style={{ color: "red" }}>
                {errors.email.message}
              </Text>
            )}
          </View>

          <View className="pt-20">
            <GradientButton loading={forgotPasswordMutation.isPending}
              title="Continue"
              onPress={handleSubmit(onSubmit)} />
          </View>


        </View>
      </View>
    </KeyboardAvoidingLayout>
  );
};

export default ForgotPasswordScreen;
