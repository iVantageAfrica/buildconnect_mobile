import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { BlueMark } from "../constants/image";
import GradientButton from "./Buttons/GradientButton";

interface SuccessScreenProps {
  title?: string;
  message?: string;
  buttonTitle?: string;
  onPress?: () => void;
  navigateTo?: keyof RootStackParamList; 
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title = "You’re all set!",
  message = "Congratulations! Your account has been created successfully.",
  buttonTitle = "Go to Homepage",
  onPress,
  navigateTo,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (onPress) return onPress();
    if (navigateTo) navigation.navigate(navigateTo);
  };

  return (
    <View className=" px-5 pt-20 ">

  <View className="flex-row justify-center">
    <Image
          source={BlueMark}
          resizeMode="contain"
          className="w-24 h-24 mb-10"
        />
  </View>
        

      <Text className="text-3xl pt-40 font-interbold text-center mb-3">{title}</Text>

      <Text className="text-gray-600 font-inter text-lg text-center mb-10 leading-6">
        {message}
      </Text>
      <View className="pt-40">
      <GradientButton onPress={handlePress} title={buttonTitle} />
      </View>
    </View>
  );
};

export default SuccessScreen;
