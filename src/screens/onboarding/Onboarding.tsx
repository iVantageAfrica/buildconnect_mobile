import PrimaryButton from "@/src/ui/components/Buttons";
import type { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import  colors from '../../constants/colors';

interface OnboardingScreenProps {
  navigation: NavigationProp<any>;
}

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const { width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      key: "s1",
      title: "Your Gateway to Seamless Financial Services",
      description:
        "Experience effortless access to all your financial needs, from saving to investing, in one place.",
      image: require("./../../assets/images/landing1.png"),
    },
    {
      key: "s2",
      title: "Achieve Your Financial Goals with Ease",
      description:
        "Experience a seamless blend of savings, investments, and housing options.",
      image: require("./../../assets/images/landing1.png"),
    },
    {
      key: "s3",
      title:  `Save towards your equity with`,
      description:
        `With 5,000 properties, lets you buy from trusted developers and grow your savings.`,
      image: require("./../../assets/images/landing1.png"),
    },
  ];

  interface Slide {
    key: string;
    title: string;
    description: string;
    image: any;
  }

  const RenderItem = ({ item, index }: { item: Slide; index: number }) => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
        backgroundColor: colors.primary_color,
      }}
    >

      <Image
        source={item.image}
        style={{ width: width * 0.85, height: 300, marginBottom: 24 }}
        resizeMode="contain"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={{
              backgroundColor: i === activeIndex ? colors.primary_color : colors.text_secondary,
              width: i === activeIndex ? 50 : 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
     
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: colors.text_primary,
          textAlign: "center",
          marginTop: 16,
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: colors.text_secondary,
          textAlign: "center",
          marginTop: 8,
        }}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        data={slides}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
        onSlideChange={setActiveIndex}
        showSkipButton={true}
        renderPagination={() => null}
        showNextButton={false}
        showDoneButton={false}
      />

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.color_white,
          paddingVertical: 16
        }}
      >
        <PrimaryButton
          title="Sign In"
          active={true}
          onPress={() => navigation.navigate("SignIn")}
          style={{ width: '90%', marginHorizontal: 8 }}
        />
        <PrimaryButton
          title="Sign Up"
          active={false}
          onPress={() => navigation.navigate("SignUpScreen")}
          style={{ width: '90%', marginHorizontal: 8, marginTop: 12 }}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
