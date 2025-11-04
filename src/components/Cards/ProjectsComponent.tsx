import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { ClockIcon, HeartIcon, LocationIcon, UserIcon } from '@/src/constants/icon';

interface ProjectsComponentProps {
  postedTime: string;
  projectName: string;
  location: string;
  description: string;
  budget: string;
  duration: string;
  bids: string;
  onPress?: () => void;
  heartIcon?: ImageSourcePropType;
  locationIcon?: ImageSourcePropType;
  clockIcon?: ImageSourcePropType;
  userIcon?: ImageSourcePropType;
}

const ProjectsComponent: React.FC<ProjectsComponentProps> = ({
  postedTime,
  projectName,
  location,
  description,
  budget,
  duration,
  bids,
  onPress,
  heartIcon = HeartIcon,
  locationIcon = LocationIcon,
  clockIcon = ClockIcon,
  userIcon = UserIcon,
}) => {
  return (
    <TouchableOpacity className="m-4 p-4 bg-white rounded-xl" onPress={onPress}>
      <View className="flex-row p-3 justify-between">
        <Text className="font-inter">{postedTime}</Text>
        <Image style={{ width: 60, height: 20 }} resizeMode="contain" source={heartIcon} />
      </View>

      <View>
        <Text className="text-2xl font-worksanssemibold">{projectName}</Text>

        <View className="flex-row gap-2 py-3 items-center">
          <Image source={locationIcon} style={{ width: 15, height: 15 }} resizeMode="contain" />
          <Text className="font-inter">{location}</Text>
        </View>

        <Text className="py-3 font-inter">{description}</Text>

        <View className="flex-row gap-2">
          <Text className="font-inter">Budget:</Text>
          <Text className="font-worksanssemibold text-xl">{budget}</Text>
        </View>

        <View className="flex-row gap-4 pt-4 items-center">
          <View className="flex-row gap-1 items-center">
            <Image style={{ width: 15, height: 15 }} source={clockIcon} resizeMode="contain" />
            <Text className="font-inter">Duration: {duration}</Text>
          </View>

          <View className="flex-row gap-1 items-center">
            <Image style={{ width: 15, height: 15 }} source={userIcon} resizeMode="contain" />
            <Text className="font-inter">{bids}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectsComponent;
