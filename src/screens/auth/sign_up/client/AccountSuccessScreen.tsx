import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";

type AccountSuccessScreenProps = {
  delay?: number; 
};

const AccountSuccessScreen: React.FC<AccountSuccessScreenProps> = ({
  delay = 3000, 
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Dashboard");
    }, delay);

    return () => clearTimeout(timer);
  }, [navigation, delay]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {/* Party Emoji with Confetti - Centered in upper third */}
      <View className="mb-12">
        <Text style={{ fontSize: 100, textAlign: "center" }}>🥳</Text>
      </View>

      {/* Congratulations Message - Centered */}
      <Text className="text-2xl font-interbold text-center text-black leading-8 px-6">
        Congratulations, your account{"\n"}has been created. Let's get you{"\n"}started
      </Text>

      {/* Loading Spinner at Bottom */}
      <View className="absolute bottom-24">
        <ActivityIndicator size="small" color="#000000" />
      </View>
    </View>
  );
};

export default AccountSuccessScreen;

