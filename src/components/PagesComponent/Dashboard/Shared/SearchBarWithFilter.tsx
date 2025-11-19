import React from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import { SearchIcon, SettingsIcon } from "@/src/constants/icon";

interface SearchBarWithFilterProps {
  placeholder?: string;
  onSearchChange?: (text: string) => void;
  onFilterPress?: () => void;
}

const SearchBarWithFilter: React.FC<SearchBarWithFilterProps> = ({
  placeholder = "Search...",
  onSearchChange,
  onFilterPress,
}) => {
  return (
    <View className="flex-row pt-5 gap-2 px-2">
      <View className="flex-1">
        <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-4 border border-gray-200">
          <Image
            source={SearchIcon}
            resizeMode="contain"
            className="w-5 h-5 mr-3"
          />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-base font-inter text-gray-800"
            onChangeText={onSearchChange}
          />
        </View>
      </View>
      <TouchableOpacity onPress={onFilterPress}>
        <View className="w-14 h-14 bg-gray-100 rounded-lg items-center justify-center border border-gray-200">
          <Image source={SettingsIcon} className="w-6 h-6" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBarWithFilter;

