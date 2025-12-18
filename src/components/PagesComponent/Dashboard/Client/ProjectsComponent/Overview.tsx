import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import ProgressBar from '../../../../Miscallaneous/ProgressBar'
import ProjectTimeline from '../../../../Cards/ProjectTimeline'
import PrimaryButton from '@/src/components/Buttons/Button'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/src/navigation/RootNavigator'
import { useProjects } from '@/src/core/hooks/useProjects'

const Overview = (projectId:{projectId : string}) => {
    const { getSingleProjectQuery } = useProjects();
    const { data, isLoading, error } = getSingleProjectQuery(projectId.projectId);
    
    // Fix the data extraction - based on your data structure
    const apiResponse = data?.data;
    const apiData = apiResponse?.data || apiResponse; 
    const projectData = apiData || {};
    
    console.log("Overview", projectData)
  
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const handleCloseproject = () => {
        navigation.navigate("ClosedProjects");
    }
    
    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center py-20">
                <ActivityIndicator size="large" color="#2463EB" />
                <Text className="mt-4 text-gray-600">Loading project details...</Text>
            </View>
        );
    }
    
    // Show error state if there's an error
    if (error) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-red-500 text-center mb-4">
                    Error loading project details. Please try again.
                </Text>
            </View>
        );
    }
    
    
 
    
    return (
        <View>
            <View className="pt-4 bg-white m-4 rounded-xl ">
                <Text className="font-interbold px-4 text-2xl">Project Description</Text>
                <Text className="font-inter px-4 pt-4">
                    {projectData?.description || "No description available"}
                </Text>
                <ProgressBar progress={projectData?.progress?.progressPercentage || 0}/>
                <View className="px-4 py-4 flex-row justify-between">
                    <Text className="font-interbold text-lg">Budget</Text>
                    <Text className="font-interbold text-lg">
                        {projectData?.budgetRange?.label || "Not specified"}
                    </Text>
                </View>
                <View className="px-4 py-4 flex-row justify-between">
                    <Text className="font-interbold text-lg">Timeline</Text>
                    <Text className="font-interbold text-lg">
                        {projectData?.timeline?.label || "Not specified"}
                    </Text>
                </View>
                <View className="px-4 py-4 flex-row justify-between">
                    <Text className="font-interbold text-lg">Project Type</Text>
                    <Text className="font-interbold text-lg">
                        {projectData?.projectType?.label || "Not specified"}
                    </Text>
                </View>
            </View>

            <ProjectTimeline milestones={projectData?.milestones || []}/>
            
          
            {projectData?.status !== 'draft' && (
                <>
                    <View className="p-4 m-4 bg-white rounded-xl">
                        <Text className="font-interbold text-gray-400 text-xl">Fund in Escrow</Text>
                        <Text className="text-xl font-interbold py-3">#17,380,690</Text>
                        <Text className="font-inter">Manage by abbey Mortgage Bank</Text>
                    </View>

                    <View className="mx-3">
                        <PrimaryButton 
                            onPress={handleCloseproject} 
                            className="bg-gray-300" 
                            textColor='black'  
                            title='Close Project' 
                            backgroundColor='white'
                        />
                    </View>
                </>
            )}
        </View>
    )
}

export default Overview