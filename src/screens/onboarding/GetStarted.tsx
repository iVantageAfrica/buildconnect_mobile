import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { GetStartedImage } from "@/src/constants/image";
import PrimaryButton from "@/src/components/Buttons/Button";
import AuthLink from "@/src/components/AuthLink";

const GetStarted = ({ navigation }: any) => {
  const [selectedRole, setSelectedRole] = useState<string>("builder");
  const handleNavigation = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View>
      <ImageBackground className="h-full w-full" source={GetStartedImage}>
        <View className="flex-col justify-end h-full items-center pb-[40px] px-11">
          <Text className="font-worksansBold text-white text-3xl   text-center px-5">
            Get quality projects, showcase, grow your work
          </Text>

          <View className="flex-row bg-white/20 rounded-full p-1 w-full max-w-md mt-8">
            <TouchableOpacity
              className={`flex-1 py-3.5 px-5 items-center justify-center rounded-full ${
                selectedRole === "client" ? "bg-white" : ""
              }`}
              onPress={() => setSelectedRole("client")}
            >
              <Text
                className={`text-base font-inter font-medium ${
                  selectedRole === "client" ? "text-gray-800" : "text-white/70"
                }`}
              >
                I'm a Clients
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-3.5 px-5 items-center justify-center rounded-full ${
                selectedRole === "builder" ? "bg-white" : ""
              }`}
              onPress={() => setSelectedRole("builder")}
            >
              <Text
                className={`text-base font-inter font-medium ${
                  selectedRole === "builder" ? "text-gray-800" : "text-white/70"
                }`}
              >
                I'm a Builder
              </Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            className="my-6"
            onPress={handleNavigation}
            textColor="white"
            title="Create account"
          />

       <AuthLink
  questionText="Already have an account?"
  linkText="Login"
  onPress={() => navigation.navigate("SignIn")}
  className="justify-center mt-4"
  questionClassName="text-gray-200 text-sm"
  linkClassName="text-white  text-base"
 />

        </View>
      </ImageBackground>
    </View>
  );
};

export default GetStarted;
