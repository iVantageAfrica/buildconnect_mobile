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
import AuthLink from "@/src/components/AuthLink";
import { LoginInput, loginSchema } from "@/src/schemas/authschema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/src/core/hooks/useAuth";

const signin = ({ navigation }: any) => {
  const handleBack = () => {
    navigation.replace("GetStarted");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });
 
  const {loginMutation} = useAuth();

  const onSubmit = (data: LoginInput) => {
   loginMutation.mutate(data);
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
        <View className="flex-row pt-8 justify-center">
          <Image
            className="w-[280px]"
            source={BuildConnectImage}
            resizeMode="contain"
          />
        </View>
        <View className="mx-4 space-y-4">
          <View>
            <Controller
              control={control}
              name="emailAddress"
              render={({ field }) => (
                <FormInput
                  placeholder="Email"
                  label="Email"
                  width="w-full"
                  value={field.value}
                  hasError={!!errors.emailAddress}
                  onChangeText={field.onChange}
                />
              )}
            />

            {errors.emailAddress && (
              <Text className="font-inter  pt-2" style={{ color: "red" }}>
                {errors.emailAddress.message}
              </Text>
            )}
          </View>

          <View>
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
            <View className="flex-row gap-10">

              {errors.password && (
              <Text className="text-red-500 font-inter pt-2 text-sm">{errors.password.message}</Text>
            )}

            <Text className="text-primary font-inter text-right pt-2 ">
              Forgot password?
            </Text>
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
            <View className="mt-12">
              <AuthLink
                questionText="Dont have an account? "
                linkText="Signup"
                onPress={() => navigation.navigate("SignUp")}
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

export default signin;
