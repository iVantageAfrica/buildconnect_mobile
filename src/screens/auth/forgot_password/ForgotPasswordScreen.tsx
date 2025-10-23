import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { arrowleft } from "@/src/constants/icon";
import FormInput from "@/src/components/Forms/Formnput";
import GradientButton from "@/src/components/Buttons/GradientButton";
import KeyboardAvoidingLayout from "@/src/components/KeyboardAvoidLayout";
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
      emailAddress: "",
    },
  });
 
  const {forgotPassMutation} = useAuth();

  const onSubmit = (data: ForgotPasswordInput) => {
   forgotPassMutation.mutate(data);
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
          <Text className="font-interbold text-center text-3xl py-8">Forgot Your Password</Text>
                    <Text className="font-inter text-center text-xl py-4">No worries! Enter the email address or phone number below</Text>
        </View>
        <View className="mx-4 space-y-4 pt-10">
          <View>
            <Controller
              control={control}
              name="emailAddress"
              render={({ field }) => (
                <FormInput
                  placeholder="user@gmail.com"
                  label="Email"
                  value={field.value}
                  hasError={!!errors.emailAddress}
                  onChangeText={field.onChange}
                />
              )}
            />

            {errors.emailAddress && (
              <Text className="font-inter text-xs  pt-2" style={{ color: "red" }}>
                {errors.emailAddress.message}
              </Text>
            )}
          </View>

          <View className="pt-8">
            <GradientButton loading={forgotPassMutation.isPending} title="Continue" onPress={handleSubmit(onSubmit)} />
          </View>

    
        </View>
      </View>
    </KeyboardAvoidingLayout>
  );
};

export default ForgotPasswordScreen;
