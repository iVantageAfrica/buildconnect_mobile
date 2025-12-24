import React, { ReactNode } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { arrowleft } from '@/src/constants/icon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import colors from '@/src/constants/colors';

interface AppLayoutProps {
  screenName: string;
  children: ReactNode;
  navigateTo?: keyof RootStackParamList; // Optional: specify where to navigate
}

const AppLayout: React.FC<AppLayoutProps> = ({ screenName, children, navigateTo }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const handleBack = () => {
    if (navigateTo) {
      // If a specific route is provided, navigate to it
      navigation.navigate(navigateTo);
    } else {
      // Default: go back to previous screen
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        // Fallback to Dashboard if there's no history
        navigation.navigate("Dashboard");
      }
    }
  };

  return (
    <View className="flex-1">
      <View 
        className="z-10 border-b border-gray-300 py-6 px-2"
        style={{ backgroundColor: colors.background_light }}
      >
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity onPress={handleBack} className="absolute left-2">
            <Image
              source={arrowleft}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text className="font-worksansBold text-xl">{screenName}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default AppLayout;