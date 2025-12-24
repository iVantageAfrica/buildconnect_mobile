import AppLayout from '@/src/components/Layouts/AppLayout'
import EmptyScreenComponent from '@/src/components/Miscallaneous/EmptyScreenComponent'
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/src/navigation/RootNavigator'
import ProjectsWithMilestone from '@/src/components/Cards/ProjectsWithMileStone'
import { useProjects } from '@/src/core/hooks/useProjects'
import { Project, ProjectQueryParams } from '@/src/types/api'

const ClientProjectsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [queryParams, setQueryParams] = useState<ProjectQueryParams>({
    page: 1,
    limit: 100,
    includeProgress: true
  });

  const { getAllProjectsQuery } = useProjects();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const { 
    data: apiResponse, 
    isLoading: isLoadingProjects, 
    error: projectsError 
  } = getAllProjectsQuery(queryParams);  
    
  const projectsList: Project[] = apiResponse?.data?.data?.projects || 
                                  apiResponse?.data?.projects || 
                                  apiResponse?.projects || 
                                  [];

  // Get status filter counts - similar to FindprojectsScreen
  const getStatusFilterCounts = () => {
    const allCount = projectsList.length;
    const draftCount = projectsList.filter(p => p.status === 'draft').length;
    const postedCount = projectsList.filter(p => p.status === 'posted').length;
    const inProgressCount = projectsList.filter(p => p.status === 'in_progress').length;
    const completedCount = projectsList.filter(p => p.status === 'completed').length;
    const cancelledCount = projectsList.filter(p => p.status === 'cancelled').length;

    return [
      { id: 'all', label: 'All Projects', count: allCount },
      { id: 'draft', label: 'Draft', count: draftCount },
      { id: 'posted', label: 'Posted', count: postedCount },
      { id: 'in_progress', label: 'In Progress', count: inProgressCount },
      { id: 'completed', label: 'Completed', count: completedCount },
      { id: 'cancelled', label: 'Cancelled', count: cancelledCount },
    ];
  };

  const statusFilters = getStatusFilterCounts();


  const handleStatusFilter = (status: string) => {
    setSelectedFilter(status);
    
    const newParams: ProjectQueryParams = {
      ...queryParams,
      page: 1,
    };

    // Remove status filter if 'all' is selected
    if (status === 'all') {
      delete newParams.status;
    } else {
      newParams.status = status;
    }

    setQueryParams(newParams);
  };


  const getFilteredProjects = () => {
 
    if (selectedFilter === 'all') {
      return projectsList;
    }
    

    return projectsList.filter(project => project.status === selectedFilter);
  };

  const filteredProjects = getFilteredProjects();


  const formatStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'draft': 'Draft',
      'posted': 'Posted',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'cancelled': 'Cancelled',
      'all': 'All'
    };
    
    return statusMap[status] || status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  const handleAddProject = () => {
    navigation.navigate('AddProject');
  };

  const handleProjectPress = (projectId: string) => {
    navigation.navigate('ProjectDetails', { projectId });
  };

  return (
    <AppLayout screenName={"Projects"}>
      <View className="mt-8 flex-1">
   
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-4 gap-2"
        >
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              className={`px-4 py-2.5 rounded-full border min-w-[100px] ${
                selectedFilter === filter.id
                  ? 'bg-blue-600 border-blue-600'
                  : 'bg-white border-gray-200'
              }`}
              onPress={() => handleStatusFilter(filter.id)}
            >
              <Text
                className={`text-xs font-inter font-medium text-center ${
                  selectedFilter === filter.id ? 'text-white' : 'text-gray-800'
                }`}
              >
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
       

       
        {isLoadingProjects ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#2463EB" />
            <Text className="mt-4 text-gray-600">Loading projects...</Text>
          </View>
        ) : projectsError ? (
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-red-500 text-center mb-4">
              Error loading projects. Please try again.
            </Text>
            <TouchableOpacity
              className="bg-blue-600 px-6 py-3 rounded-lg"
              onPress={() => { /* Add retry logic here */ }}
            >
              <Text className="text-white font-medium">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredProjects.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20 px-4">
            <EmptyScreenComponent 
              title={selectedFilter !== 'all' 
                ? `No "${formatStatusLabel(selectedFilter)}" Projects` 
                : "No Projects Found"}
              description={selectedFilter !== 'all'
                ? `You don't have any ${formatStatusLabel(selectedFilter).toLowerCase()} projects yet`
                : "You haven't created any projects yet"}
              buttonText="Add Your First Project"
              onButtonPress={handleAddProject}
            />
          </View>
        ) : (
          <ScrollView 
            showsVerticalScrollIndicator={false}
            className="mt-4"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {filteredProjects.map((project) => (
              <View key={project.id} className="mb-4 px-4">
                <ProjectsWithMilestone
                  postedTime="Posted 1 hour ago"
                  projectName={project.title}
                  progress={project?.progress?.progressPercentage || 0}
                  location={project.location}
                  description={project.description}
                  budget={project.budgetRange?.label || "N/A"}
                  duration={project.timeline?.label || "N/A"}
                  role="client"
                  bids={String(project.bidCount || 0)}
                   
                   onPress={() =>
                  navigation.navigate('ClientProjectDetails', { projectId: project.id })
                }
                />
              </View>
            ))}
            

            {apiResponse?.data?.data?.pagination && (
              <View className="py-6 items-center">
                <Text className="text-gray-500 text-sm mb-2">
                  Showing {filteredProjects.length} of {apiResponse.data.data.pagination.total} projects
                </Text>
                {apiResponse.data.data.pagination.page < apiResponse.data.data.pagination.totalPages && (
                  <TouchableOpacity
                    className="bg-blue-600 px-6 py-3 rounded-lg"
                    onPress={() => {
                      setQueryParams(prev => ({
                        ...prev,
                        page: (prev.page || 1) + 1,
                      }));
                    }}
                  >
                    <Text className="text-white font-medium">Load More Projects</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </AppLayout>
  )
}

export default ClientProjectsScreen