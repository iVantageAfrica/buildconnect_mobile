import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface QuickAccessCardProps {
  icon: any;
  title: string;
  onPress?: () => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  icon,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 items-center justify-center border border-gray-200"
      style={{ width: 100, height: 100 }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        className="w-10 h-10 mb-2"
      />
      <Text className="text-xs font-inter text-center text-gray-700 mt-1">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default QuickAccessCard;

