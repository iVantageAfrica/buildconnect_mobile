import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { notification } from "@/src/constants/icon";
import { AvatarImage } from "@/src/constants/image";

interface DashboardHeaderProps {
  userName?: string;
  showDropdown?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  showDropdown = false,
  onNotificationPress,
  onProfilePress,
}) => {
  const displayName = userName || "User";

  return (
    <View className="bg-white z-10">
      <View className="flex-row justify-between items-center gap-2 p-4">
        <TouchableOpacity
          onPress={onProfilePress}
          className="flex-row items-center gap-3"
        >
          <Image source={AvatarImage} className="w-12 h-12 rounded-full" />
          <View className="flex-row items-center gap-1">
            <Text className="font-work-sans text-base text-gray-900">
              Hi, {displayName}
            </Text>
            {showDropdown && (
              <Text className="text-gray-600 text-sm">▼</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNotificationPress}>
          <Image
            resizeMode="contain"
            source={notification}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;

