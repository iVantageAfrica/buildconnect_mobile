import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import DashboardHeader from "@/src/components/PagesComponent/Dashboard/Shared/DashboardHeader";
import SearchBarWithFilter from "@/src/components/PagesComponent/Dashboard/Shared/SearchBarWithFilter";
import QuickAccessCard from "@/src/components/PagesComponent/Dashboard/Shared/QuickAccessCard";
import { AddCircle, BankIcon, House, PlusIcon, Question, SupportIcon } from "@/src/constants/icon";
import { useAuthStore } from "@/src/store/Authstore";
import ImageBanner from "@/src/components/AdsBanner/ImageBanner";
import { AbeyyMortgageBankBanner } from "@/src/constants/banner";
import ProjectsWithMilestone from "@/src/components/Cards/ProjectsWithMileStone";
import { useProjects } from "@/src/core/hooks/useProjects";
import EmptyComponent from "@/src/components/Miscallaneous/EmptyComponent";
import ClientPropertiesComponet from "@/src/components/Cards/ClientPropertiesComponent";


const ClientHome = ({ navigation }: any) => {
  const { user } = useAuthStore();
  const { projects, isLoadingProjects, projectsError } = useProjects();
  const firstName = user?.firstName || "User";
  
  // Ensure projects is always an array
  const projectsList = Array.isArray(projects) ? projects : [];
  
  // Log projects in component
  React.useEffect(() => {
    console.log("=== PROJECTS IN HOME COMPONENT ===");
    console.log("Projects:", projects);
    console.log("Projects List:", projectsList);
    console.log("Projects List Length:", projectsList.length);
  }, [projects, projectsList]);

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
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 8 }}
      >

        <SearchBarWithFilter
          placeholder="Search..."
          onFilterPress={() => { }}
        />

        <View className="mx-2">
          <ImageBanner imageSrc={AbeyyMortgageBankBanner} />
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
            {projectsList && projectsList.length > 2 && (
              <TouchableOpacity onPress={handleProject} className="">
                <Text className="font-inter">View all</Text>
              </TouchableOpacity>
            )}
          </View>

          {isLoadingProjects ? (
            <View className="flex-1 justify-center items-center py-20">
              <ActivityIndicator size="large" color="#2463EB" />
            </View>
          ) : projectsError || !projectsList || projectsList.length === 0 ? (
            <EmptyComponent title={""} />
          ) : (
            <>
              {/* Show only first 2 projects */}
              {projectsList.slice(0, 2).map((project) => (
                <ProjectsWithMilestone
                  key={project.id}
                  postedTime="Posted 1 hour ago"
                  projectName={project.title}
                  location={project.location}
                  description={project.description}
                  budget={project.budgetRange?.label || "N/A"}
                  duration={project.timeline?.label || "N/A"}
                  role="client"
                  bids="0"
                  onPress={() =>
                    navigation.navigate('ProjectDetails', { projectId: project.id })
                  }
                />
              ))}
            </>
          )}
        </View>

        <View>
          <View className="mx-3 flex-row justify-between ">
            <Text className="font-interbold  text-xl mb-4 text-gray-900">
              Recommendations
            </Text>
            {projectsList && projectsList.length > 2 && (
              <TouchableOpacity onPress={handleProject} className="">
                <Text className="font-inter">View all</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text className="px-2 font-inter">
            Based on your Lagos Searches
          </Text>
          <View>
            <ClientPropertiesComponet />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={handleAddProject}
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full flex-row items-center px-6 py-4 shadow-lg"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text className="text-white text-2xl font-bold mr-2">+</Text>
        <Text className="text-white font-inter text-base font-medium">Add Project</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClientHome;

