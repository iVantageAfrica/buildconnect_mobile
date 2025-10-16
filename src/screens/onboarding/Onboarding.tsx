import type { NavigationProp } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  OnboardingImage1,
  OnboardingImage2,
  OnboardingImage3,
} from "@/src/constants/image";
import { arrowleft, level1, level2, level3 } from "@/src/constants/icon";

interface OnboardingScreenProps {
  navigation: NavigationProp<any>;
}

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const { width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<AppIntroSlider>(null);

  const slides = [
    {
      key: "s1",
      title: "Find Your Dream Home With Us",
      description:
        "Discover your perfect home or investment property with ease.",
      image: OnboardingImage1,
      icon: level1,
    },
    {
      key: "s2",
      title: "Track Progress",
      description:
        "Monitor milestones, payments, and media updates in one centralized dashboard",
      image: OnboardingImage2,
      icon: level2,
    },
    {
      key: "s3",
      title: `Let Find Your Dream Property`,
      description: `Start your journey today and make your real estate dream`,
      image: OnboardingImage3,
      icon: level3,
    },
  ];

  interface Slide {
    key: string;
    title: string;
    description: string;
    image: any;
    icon: any;
  }

  const handleSkip = () => {
    navigation.navigate("GetStarted"); 
  };

  const handleBack = (currentIndex: number) => {
    if (currentIndex > 0) {
      sliderRef.current?.goToSlide(currentIndex - 1);
    }
  };

  const handleNext = (currentIndex: number) => {
    if (currentIndex < slides.length - 1) {
      sliderRef.current?.goToSlide(currentIndex + 1);
    } else {
      navigation.navigate("GetStarted"); 
    }
  };

  const RenderItem = ({ item, index }: { item: Slide; index: number }) => (
    <ImageBackground source={item.image} className="flex-1 w-full h-full">
      <View className="flex-row px-8 pt-4 justify-between">
        {index > 0 ? (
          <TouchableOpacity onPress={() => handleBack(index)}>
     <Image 
  source={arrowleft} 
  resizeMode="contain"
  style={{ width: 30, height: 30 }}
/>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-black text-xl">Skip</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-col justify-end h-full items-center pb-[70px] px-11">
        <Text className="text-white font-work-sans-bold text-center text-3xl font-extrabold pb-4">
          {item.title}
        </Text>
        <Text className="text-white font-work-sans text-center text-xl ">
          {item.description}
        </Text>
        <TouchableOpacity className="pt-12" onPress={() => handleNext(index)}>
          <Image
            className="w-[150px] h-24"
            source={item.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <View className="flex-1">
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} />
        )}
        onSlideChange={setActiveIndex}
        showSkipButton={true}
        renderPagination={() => null}
        showNextButton={false}
        showDoneButton={false}
      />
    </View>
  );
};

export default OnboardingScreen;