import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { arrowleft } from "@/src/constants/icon";
import colors from "@/src/constants/colors";

interface AuthHeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  onBackPress,
  showBackButton = true,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View className="flex-row items-center justify-center relative pt-10 pb-6">
      {showBackButton && (
        <TouchableOpacity
          onPress={handleBack}
          className="absolute left-0 z-10"
          style={{ paddingLeft: 16, paddingTop: 10 }}
        >
          <Image
            source={arrowleft}
            resizeMode="contain"
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      )}
      <Text className="font-interbold text-2xl text-center flex-1 px-4">
        {title}
      </Text>
    </View>
  );
};

export default AuthHeader;

