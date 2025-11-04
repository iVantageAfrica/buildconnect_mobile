
import Search from '@/src/components/Forms/Search';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PROJECTS } from '@/src/utils/data';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import AppLayout from '@/src/components/Layouts/AppLayout';
import PropertiesComponent from '@/src/components/Cards/PropertiesComponent';
import EmptyScreenComponent from '@/src/components/Miscallaneous/EmptyScreenComponent';


const PropertiesScreen = () => {

const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
   const handleNavigation = () => {
    navigation.replace("CreateProperty");
   }

  return (
    <AppLayout screenName="Properties">
      <View className="pt-3">
        <Search />
      </View>

      <View className="  pt-12">
     

   
  {PROJECTS.length > 0 ? (
     <PropertiesComponent/>
   
  ) : (
    <EmptyScreenComponent/>
  )}

 <View className="flex-row justify-end mr-3 mt-4">
               <TouchableOpacity onPress={handleNavigation} className="bg-blue-600 w-40  flex-row items-end px-6 py-3 rounded-full">
     <Text className="text-white text-2xl">+</Text>
      <Text className="text-white font-work-sans text-base ml-2">
        Add Property
      </Text>
    </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
};

export default PropertiesScreen;
