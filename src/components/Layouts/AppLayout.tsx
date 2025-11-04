import React, { Children, ReactNode } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { arrowleft } from '@/src/constants/icon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/navigation/RootNavigator';


interface AppLayoutProps {
  screenName: string;
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({  screenName, children}) => {
   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleBack = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white z-10 border-b border-gray-300 py-6 px-2">
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
