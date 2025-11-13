import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DashboardHeader from "@/src/components/PagesComponent/Dashboard/Shared/DashboardHeader";
import SearchBarWithFilter from "@/src/components/PagesComponent/Dashboard/Shared/SearchBarWithFilter";
import QuickAccessCard from "@/src/components/PagesComponent/Dashboard/Shared/QuickAccessCard";
import { AddCircle, House, Question } from "@/src/constants/icon";
import { useAuthStore } from "@/src/store/Authstore";

const ClientHome = ({ navigation }: any) => {
  const { user } = useAuthStore();
  const firstName = user?.firstName || "User";

  const handleNotification = () => {
    navigation.navigate("Notification");
  };

  const handleAddProject = () => {
    // Navigate to add project screen
    console.log("Add Project pressed");
  };

  const handleEscrowAccount = () => {
    // Navigate to escrow account screen
    console.log("Escrow Account pressed");
  };

  const handleSupport = () => {
    // Navigate to support screen
    console.log("Support pressed");
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <DashboardHeader
        userName={firstName}
        showDropdown={true}
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

          {/* Promotional Banner */}
          <View className="mx-4 mt-6 rounded-2xl overflow-hidden">
            <LinearGradient
              colors={["#143885", "#87B4F2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ padding: 24 }}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1 pr-4">
                  <Text className="text-white font-interbold text-base mb-4 leading-6">
                    Enjoy 15% off in Abbey's Mortgage properties
                  </Text>
                  <TouchableOpacity className="bg-white rounded-full px-6 py-3 self-start">
                    <Text className="text-blue-600 font-interbold text-sm">
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="w-20 h-20 items-center justify-center">
                  {/* Placeholder for house illustration - can be replaced with actual image */}
                  <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center">
                    <Image
                      source={House}
                      className="w-10 h-10"
                      style={{ tintColor: "white" }}
                    />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Access Section */}
          <View className="mt-8 px-4">
            <Text className="font-interbold text-lg mb-4 text-gray-900">
              Quick Access
            </Text>
            <View className="flex-row gap-4">
              <QuickAccessCard
                icon={AddCircle}
                title="Add Project"
                onPress={handleAddProject}
              />
              <QuickAccessCard
                icon={House}
                title="Escrow Account"
                onPress={handleEscrowAccount}
              />
              <QuickAccessCard
                icon={Question}
                title="Support"
                onPress={handleSupport}
              />
            </View>
          </View>

          {/* My Projects Section */}
          <View className="mt-8 px-4">
            <Text className="font-interbold text-lg mb-4 text-gray-900">
              My Projects
            </Text>
            <View className="bg-blue-50 rounded-2xl p-6 relative overflow-hidden">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  {/* Placeholder for clipboard illustration */}
                  <View className="w-32 h-32 bg-blue-100 rounded-full items-center justify-center mb-4">
                    <Image
                      source={AddCircle}
                      className="w-16 h-16"
                      style={{ tintColor: "#3B82F6" }}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleAddProject}
                  className="bg-blue-600 rounded-full px-6 py-4 flex-row items-center"
                >
                  <Text className="text-white text-2xl font-bold mr-2">+</Text>
                  <Text className="text-white font-interbold text-sm">
                    Add Project
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
    </View>
  );
};

export default ClientHome;

