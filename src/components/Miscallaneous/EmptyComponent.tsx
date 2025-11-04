import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { CustomSurvey } from '@/src/constants/image';


const EmptyComponent = ({ title }) => {
  return (
    <View className="bg-white mx-2 rounded-xl mt-4">
      <View className="flex-1 p-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-worksanssemibold text-2xl">{title}</Text>
          <TouchableOpacity>
            <Text className="font-work-sans text-blue-500">See all</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center py-20">
          <Image
            source={CustomSurvey}
            resizeMode="contain"
            style={{ width: 90, height: 90 }}
          />
        </View>
      </View>
    </View>
  );
};

export default EmptyComponent;
