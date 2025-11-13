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
import DividerWithText from "@/src/components/Miscallaneous/Divider";
import ButtonWithIcon from "@/src/components/Buttons/ButtonWithIcon";
import KeyboardAvoidingLayout from "@/src/components/Layouts/KeyboardAvoidLayout";
import AuthLink from "@/src/components/Miscallaneous/AuthLink";
import { LoginInput, loginSchema } from "@/src/schemas/authschema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/src/core/hooks/useAuth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const handleBack = () => {
    navigation.replace("GetStarted");
  };

  const forgotPassword = () => {
    navigation.replace("ForgotPassword");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginMutation } = useAuth();

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data);
  };

  return (
    <KeyboardAvoidingLayout>
      <View>
        <TouchableOpacity className="pt-5 pl-4" onPress={() => handleBack()}>
          <Image
            source={arrowleft}
            resizeMode="contain"
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Image
            className="w-[280px]"
            source={BuildConnectImage}
            resizeMode="contain"
          />
        </View>
        <View className="mx-4 space-y-2">
          <View>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormInput
                  placeholder="user@gmail.com"
                  label="Email Address"
                  value={field.value}
                  hasError={!!errors.email}
                  onChangeText={(text) => field.onChange(text.toLowerCase())}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
            />

            {errors.email && (
              <Text className="font-inter text-xs  pt-2" style={{ color: "red" }}>
                {errors.email.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  placeholder="Password (8 or more characters)"
                  label="Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  hasError={!!errors.password}
                />
              )}
            />
            <View className="flex-row justify-between items-start">
              {errors.password && (
                <Text className="text-red-500 font-inter pt-2 text-xs flex-1">{errors.password.message}</Text>
              )}

              <TouchableOpacity onPress={forgotPassword} className="pt-2">
                <Text className="text-primary font-inter text-sm">Forgot password?</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View className="pt-8">
            <GradientButton loading={loginMutation.isPending} title="Continue" onPress={handleSubmit(onSubmit)} />
          </View>

          <View>
            <DividerWithText text="or" />
          </View>
          <View className="">
            <View className="pb-6">
              <ButtonWithIcon
                icon={AppleImage}
                onPress={() => { }}
                textColor="black"
                title="Continue With Apple"
              />
            </View>
            <View>
              <ButtonWithIcon
                onPress={() => { }}
                icon={GoggleImage}
                textColor="black"
                title="Continue With Google"
              />
            </View>
            <View className="mt-12">
              <AuthLink
                questionText="Dont have an account? "
                linkText="Signup"
              /*   onPress={() => navigation.navigate("SignUp")} */
                onPress={() => navigation.navigate("BuilderBasicInfo")}
                className="justify-center "
                questionClassName="text-black text-md"
                linkClassName="text-primary "
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingLayout>
  );
};

export default SignInScreen;
