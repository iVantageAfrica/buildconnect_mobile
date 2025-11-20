import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import DashboardHeader from "@/src/components/PagesComponent/Dashboard/Shared/DashboardHeader";
import SearchBarWithFilter from "@/src/components/PagesComponent/Dashboard/Shared/SearchBarWithFilter";
import QuickAccessCard from "@/src/components/PagesComponent/Dashboard/Shared/QuickAccessCard";
import { AddCircle, BankIcon, House, PlusIcon, Question, SupportIcon } from "@/src/constants/icon";
import { useAuthStore } from "@/src/store/Authstore";
import ImageBanner from "@/src/components/AdsBanner/ImageBanner";
import { AbeyyMortgageBankBanner } from "@/src/constants/banner";
import ProjectsWithMilestone from "@/src/components/Cards/ProjectsWithMileStone";
import { PROJECTS } from "@/src/utils/data";
import EmptyComponent from "@/src/components/Miscallaneous/EmptyComponent";
import ClientPropertiesComponet from "@/src/components/Cards/ClientPropertiesComponent";


const ClientHome = ({ navigation }: any) => {
  const { user } = useAuthStore();
  const firstName = user?.firstName || "User";

  const handleNotification = () => {
    navigation.navigate("Notification");
  };

  const handleAddProject = () => {
 navigation.navigate("AddProject");
  };

  const handleEscrowAccount = () => {
    // Navigate to escrow account screen
  };

  const handleSupport = () => {
    // Navigate to support screen
  };
  const handleProject = () => {

  }

  return (
    <View className="flex-1 ">
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
            onFilterPress={() => {}}
          />

        <View className="mx-2">
            <ImageBanner imageSrc={AbeyyMortgageBankBanner}/>
        </View>
      
          <View className=" px-4">
            <Text className="font-interbold text-xl mb-4 text-gray-900">
              Quick Access
            </Text>
            <View className="flex-row justify-between">
              <QuickAccessCard
                icon={PlusIcon}
                title="Add Project"
                onPress={handleAddProject}
              />
              <QuickAccessCard
                icon={BankIcon}
                title="Escrow Account"
                onPress={handleEscrowAccount}
              />
              <QuickAccessCard
                icon={SupportIcon}
                title="Support"
                onPress={handleSupport}
              />
            </View>
          </View>

      
          <View className="mt-8 ">
            <View className="mx-3 flex-row justify-between ">
             <Text className="font-interbold  text-xl mb-4 text-gray-900">
              My Projects
            </Text>
              {PROJECTS.length > 2 && (
            <TouchableOpacity onPress={handleProject} className="">
              <Text className="font-inter">View all</Text>
            </TouchableOpacity>
                  )}
            </View>
           

        
  {PROJECTS.length > 0 ? (
    <>
      {/* Show only first 2 projects */}
      {PROJECTS.slice(0, 2).map((project) => (
        <ProjectsWithMilestone
          key={project.id}
          postedTime="Posted 1 hour ago"
          projectName={project.projectname}
          location={project.location}
          description={project.description}
          budget={project.budget}
         role="client"
          bids={project.bids}
          onPress={() =>
            navigation.navigate('ProjectDetails', { projectId: project.id })
          }
        />
      ))}
    
    </>
  ) : (
    <EmptyComponent title={""} />
  )}

         
          </View>

          <View>
             <View className="mx-3 flex-row justify-between ">
             <Text className="font-interbold  text-xl mb-4 text-gray-900">
              Recommendations
            </Text>
              {PROJECTS.length > 2 && (
            <TouchableOpacity onPress={handleProject} className="">
              <Text className="font-inter">View all</Text>
            </TouchableOpacity>
                  )}
            </View>
            <Text className="px-2 font-inter">
              Based on your Lagos Searches
            </Text>
            <View>
              <ClientPropertiesComponet/>
            </View>
          </View>
        </ScrollView>
    </View>
  );
};

export default ClientHome;

