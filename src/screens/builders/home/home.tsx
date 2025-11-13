import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import InfoCard from '@/src/components/Cards/InfoCard';
import SearchBarWithFilter from '@/src/components/PagesComponent/Dashboard/Shared/SearchBarWithFilter';
import DashboardHeader from '@/src/components/PagesComponent/Dashboard/Shared/DashboardHeader';
import AvailableProjects from '@/src/components/PagesComponent/Dashboard/HomeComponents/AvailableProjects';
import { AddCircle, Code, Dollar } from '@/src/constants/icon';
import Bids from '@/src/components/PagesComponent/Dashboard/HomeComponents/MyBids';
import MyProperties from '@/src/components/PagesComponent/Dashboard/HomeComponents/Properties';
import { useAuthStore } from '@/src/store/Authstore';

const Home = ({ navigation }: any) => {
  const { clearAuthData, user } = useAuthStore();
  const firstName = user?.firstName || "Builder";

  const handleNotification = () => {
    navigation.navigate("Notification");
  };

  const handleNavigation = () => {
    navigation.replace("CreateProperty");
  };

  const handleLogout = () => {
    clearAuthData();
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <DashboardHeader
        userName={firstName}
        showDropdown={false}
        onNotificationPress={handleNotification}
        onProfilePress={() => navigation.navigate("Profile")}
      />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Search Bar with Filter */}
          <SearchBarWithFilter
            placeholder="Search..."
            onFilterPress={() => console.log("Filter pressed")}
          />

          {/* Welcome Section */}
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
            <TouchableOpacity 
              onPress={handleNavigation} 
              className="bg-blue-600 w-40 flex-row items-end px-6 py-3 rounded-full"
            >
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
