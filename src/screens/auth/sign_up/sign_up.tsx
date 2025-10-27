import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  AppleImage,
  BuildConnectImage,
  GoggleImage,
} from "@/src/constants/image";
import { arrowleft } from "@/src/constants/icon";
import FormInput from "@/src/components/Forms/Formnput";
import PasswordInput from "@/src/components/Forms/PasswordInput";
import GradientButton from "@/src/components/Buttons/GradientButton";
import DividerWithText from "@/src/components/Divider";
import ButtonWithIcon from "@/src/components/Buttons/ButtonWithIcon";
import KeyboardAvoidingLayout from "@/src/components/KeyboardAvoidLayout";
import TermsAgreement from "@/src/components/CheckBox";
import AuthLink from "@/src/components/AuthLink";
import { userSchema, SignUpInput } from "@/src/schemas/authschema";
import { useAuth } from "@/src/core/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import colors from "@/src/constants/colors";

const SignUpScreen = ({ navigation }: any) => {
  const handleBack = () => {
    navigation.replace("GetStarted");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
      termsAccepted: false,
    },
  });

  const { registerMutation } = useAuth();

  const onSubmit = (data: SignUpInput) => {
    registerMutation.mutate(data);
  };

  return (
    <KeyboardAvoidingLayout>
      <View className="px-4 flex-1 ">
        <TouchableOpacity className="pt-10" onPress={handleBack}>
          <Image
            source={arrowleft}
            resizeMode="contain"
            style={{ width: 28, height: 28 }}
          />
        </TouchableOpacity>

        <View className="items-center pt-8">
          <Image
            className="w-[240px] h-[80px]"
            source={BuildConnectImage}
            resizeMode="contain"
          />
        </View>

        <View className="mt-6">
          <Text className="font-work-sans text-black text-center pb-6 text-3xl">
            Sign up to find work
          </Text>

        <View className="pb-4">
           <ButtonWithIcon
              icon={AppleImage}
              textColor="black"
              title="Continue With Apple"
            />
        </View>

        <View>
           <ButtonWithIcon
              icon={GoggleImage}
              textColor="black"
              title="Continue With Google"
            />
        </View>
           
           
      
        </View>

        <View className="mt-8 mb-4">
          <DividerWithText text="or" />
        </View>

 
        <View className="space-y-4">
 
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormInput
                    placeholder="Enter first name"
                    label="First name"
                    value={field.value}
                    hasError={!!errors.firstName}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.firstName && (
                <Text className="font-inter pt-1 text-red-500 text-sm">
                  {errors.firstName.message}
                </Text>
              )}
            </View>

            <View className="flex-1">
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormInput
                    placeholder="Enter last name"
                    label="Last name"
                    value={field.value}
                    hasError={!!errors.lastName}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.lastName && (
                <Text className="font-inter pt-1 text-red-500 text-sm">
                  {errors.lastName.message}
                </Text>
              )}
            </View>
          </View>

          <View>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormInput
                  placeholder="Email"
                  width="w-full"
                  label="Email"
                  value={field.value}
                  hasError={!!errors.email}
                  onChangeText={field.onChange}
                />
              )}
            />
            {errors.email && (
              <Text className="font-inter pt-1 text-red-500 text-sm">
                {errors.email.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              name="mobileNumber"
              render={({ field }) => (
                <FormInput
                  placeholder="Mobile number"
                  label="Mobile Number"
                  value={field.value}
                  hasError={!!errors.mobileNumber}
                  onChangeText={field.onChange}
                />
              )}
            />
            {errors.mobileNumber && (
              <Text className="font-inter pt-1 text-red-500 text-sm">
                {errors.mobileNumber.message}
              </Text>
            )}
          </View>

          <View className="pb-2">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  placeholder="Password"
                  label="Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  hasError={!!errors.password}
                />
              )}
            />
            {errors.password && (
              <Text className="font-inter pt-1 text-red-500 text-sm">
                {errors.password.message}
              </Text>
            )}
          </View>

          <Controller
            control={control}
            name="termsAccepted"
            render={({ field: { value, onChange } }) => (
              <TermsAgreement
                checkedColor={colors.primary_color}
                uncheckedColor="#d1d5db"
                isChecked={value}
                onCheckedChange={onChange}
              />
            )}
          />
          {errors.termsAccepted && (
            <Text className="text-red-500 text-sm pt-1">
              {errors.termsAccepted.message}
            </Text>
          )}

          <View className="pt-6">
            <GradientButton
              onPress={handleSubmit(onSubmit)}
              loading={registerMutation.isPending}
              title="Create Account"
            />
          </View>
          <View className="mt-8 mb-10">
            <AuthLink
              questionText="Already have an account? "
              linkText="Sign in"
              onPress={() => navigation.navigate("SignIn")}
              className="justify-center"
              questionClassName="text-black text-md"
              linkClassName="text-primary"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingLayout>
  );
};

export default SignUpScreen;
