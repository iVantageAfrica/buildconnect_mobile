import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import InfoCard from '@/src/components/Cards/InfoCard';
import Search from '@/src/components/Forms/Search';
import AvailableProjects from '@/src/components/PagesComponent/Dashboard/HomeComponents/AvailableProjects';
import { AddCircle, Code, Dollar, notification, SettingsIcon } from '@/src/constants/icon';
import { AvatarImage } from '@/src/constants/image';
import Bids from '@/src/components/PagesComponent/Dashboard/HomeComponents/MyBids';
import MyProperties from '@/src/components/PagesComponent/Dashboard/HomeComponents/Properties';
import { useAuthStore } from '@/src/store/Authstore';

const Home = ({ navigation }: any) => {
   const { clearAuthData } = useAuthStore();
  const handlenotification = () => {
   navigation.navigate("Notification");
  }

   const handleNavigation = () => {
    navigation.replace("CreateProperty");
   }
  const handleLogout = () =>{
  clearAuthData();
  }
  return (
    <View className="flex-1 ">
      <View className="bg-white z-10">
        <View className="flex-row justify-between gap-2 p-4">
          <View className="flex-row gap-4">
            <Image source={AvatarImage} className="w-16 h-16 rounded-lg" />
            <Text className="font-work-sans pt-4 text-xl">Welcome, Adams</Text>
          </View>
          <TouchableOpacity onPress={handlenotification}>
            <Image
              resizeMode="contain"
              source={notification}
              className="w-10 h-10 rounded-lg"
            />
          </TouchableOpacity>
        </View>
      </View>

 
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
    
        <View className="flex-row pt-5 gap-2 px-2">
          <View className="flex-1">
            <Search />

          </View>
          <TouchableOpacity>
            <Image source={SettingsIcon} className="w-14 h-14" />
          </TouchableOpacity>
        </View>

     <TouchableOpacity className="bg-red-300 text-center rounded-xl w-20 py-3" onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <View className="bg-dashboard mt-8 mx-2 rounded-xl pt-6 px-4 pb-4">
          <Text className="font-worksanssemibold text-white text-3xl">
            Welcome Back!
          </Text>
          <Text className="text-white font-work-sans">
            Let's start the day with you.
          </Text>

          <View className="flex-row items-center mt-4 gap-2">
            <View className="flex-1">
              <InfoCard
                icon={AddCircle}
                title="Find Projects"
                subtitle="Browse new projects"
                onPress={() => navigation.navigate("FindProjects")}
              />
            </View>
            <View className="flex-1">
              <InfoCard
                icon={Code}
                title="My Projects"
                subtitle="Manage active work"
                onPress={() => navigation.navigate("MyProjects")}
              />
            </View>
          </View>

          <View className="flex-row items-center mt-4 gap-2">
            <View className="flex-1">
              <InfoCard
                icon={Dollar}
                title="My Wallet"
                subtitle="Track your income"
                onPress={() => console.log('My Wallet pressed')}
              />
            </View>
            <View className="flex-1">
              <InfoCard
                icon={Code}
                title="Portfolio"
                subtitle="Showcase your work"
                onPress={() => console.log('Portfolio pressed')}
              />
            </View>
          </View>
        </View>

    
        <View className="pt-2">
          <AvailableProjects />
        </View>
          <View className="pt-2">
          <Bids />
        </View>
           <View className="pt-2">
         <MyProperties/>
        </View>
        <View className="flex-row justify-end mr-3 mt-4">
                 <TouchableOpacity onPress={handleNavigation} className="bg-blue-600 w-40  flex-row items-end px-6 py-3 rounded-full">
                 <Text className="text-white text-2xl">+</Text>
                  <Text className="text-white font-work-sans text-base ml-2">
                    Add Property
                  </Text>
                </TouchableOpacity>
        </View>

      
     
      </ScrollView>
    </View>
  );
};

export default Home;
