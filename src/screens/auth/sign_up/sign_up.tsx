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

const SignUpScreen = ({ navigation }: any) => {
  const handleBack = () => {
    navigation.replace("GetStarted");
  };

  return (
    <KeyboardAvoidingLayout>
          <View className="mx-2">
      <TouchableOpacity className="pt-10 pl-2" onPress={() => handleBack()}>
        <Image
          source={arrowleft}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <View className="flex-row pt-8 justify-center">
        <Image
          className="w-[280px]"
          source={BuildConnectImage}
          resizeMode="contain"
        />
      </View>
       
       

        <View className="">
            <Text className="font-work-sans  text-black text-center pb-8 text-3xl">Sign up to find work</Text>
          <View className="pb-6">
            <ButtonWithIcon
              icon={AppleImage}
              textColor="black"
              title="Continue With Apple"
              onPress={() => console.log("Pressed")}
            />
          </View>
          <View>
            <ButtonWithIcon
              icon={GoggleImage}
              textColor="black"
              title="Continue With Google"
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>
         <View>
          <DividerWithText text="or" />
        </View>
      <View className="mx-3">
       <View className="flex-row gap-4">
  <FormInput width="flex-1" placeholder="Enter name" label="First name" />
  <FormInput width="flex-1" placeholder="Enter last name" label="Last name" />
</View>

          <View className="">
 <FormInput placeholder="Email Address" label="Email Address"></FormInput>
        </View>

                <View className="">
 <FormInput placeholder="Phone number" label="Phone Number"></FormInput>
        </View>
       
        <View className="pb-4">
          <PasswordInput
            placeholder="Password"
            label="Password"
          ></PasswordInput>

        </View>
         <TermsAgreement/>
        <View className="pt-8">
          <GradientButton title="Create Account"></GradientButton>
        </View>

        <View className="mt-12">
            <AuthLink
  questionText="Already have an account? "
  linkText="Sign in"
  onPress={() => navigation.navigate("SignIn")}
  className="justify-center "
  questionClassName="text-black text-md"
  linkClassName="text-primary "
 />
          </View>

      </View>
    </View>
    </KeyboardAvoidingLayout>
  
  );
};

export default SignUpScreen;
