import Search from '@/src/components/Forms/Search';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import AppLayout from '@/src/components/Layouts/AppLayout';
import ProjectsComponent from '@/src/components/Cards/ProjectsComponent';
import EmptyScreenComponent from '@/src/components/Miscallaneous/EmptyScreenComponent';
import { useProjects } from '@/src/core/hooks/useProjects';
import { formatTimeAgo } from '@/src/utils/data';
import { Project, ProjectQueryParams } from '@/src/types/api';



const FindprojectsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [queryParams, setQueryParams] = useState<ProjectQueryParams>({
    page: 1,
    limit: 20,
  });

  const { projectsMarketPlaceQuery } = useProjects();
  
  const { data: queryData, isLoading, error, refetch } = projectsMarketPlaceQuery(queryParams);  
  

  const apiResponse = queryData?.data;
  const apiData = apiResponse?.data;
  const projects: Project[] = apiData?.projects || [];
  const pagination = apiData?.pagination;

  // Handle search
  const handleSearch = (searchText: string) => {
    setSearchQuery(searchText);
    setQueryParams(prev => ({
      ...prev,
      page: 1,
      search: searchText.trim() || undefined,
    }));
  };

  // Handle location filter
  const handleLocationFilter = (location: string) => {
    setLocationFilter(location);
    setQueryParams(prev => ({
      ...prev,
      page: 1,
      location: location.trim() || undefined,
    }));
  };

  // Handle status filter selection
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

  // Handle refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };


  const getStatusFilterCounts = () => {
    const allCount = projects.length;
    const draftCount = projects.filter(p => p.status === 'draft').length;
    const postedCount = projects.filter(p => p.status === 'posted').length;
    const inProgressCount = projects.filter(p => p.status === 'in_progress').length;
    const completedCount = projects.filter(p => p.status === 'completed').length;
    const cancelledCount = projects.filter(p => p.status === 'cancelled').length;

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

  const getFilteredProjects = () => {
    if (selectedFilter === 'all') {
      return projects;
    }
    return projects.filter(project => project.status === selectedFilter);
  };

  const filteredProjects = getFilteredProjects();

  // Format status for display
  const formatStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  return (
    <AppLayout screenName="Project Marketplace">
      <View className="pt-3">
        <Search 
          onSearch={handleSearch}
          onLocationChange={handleLocationFilter}
          initialSearch={searchQuery}
          initialLocation={locationFilter}
        />
      </View>

      <View className="flex-1 bg-gray-100">
        {/* Debug view - shows raw data */}
        {__DEV__ && projects.length > 0 && (
          <View className="mx-4 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Text className="text-green-700 text-sm font-medium">
              ✅ Data loaded: {projects.length} projects
            </Text>
            <Text className="text-green-600 text-xs mt-1">
              Showing: {filteredProjects.length} projects after filtering
            </Text>
          </View>
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-4 gap-2 mt-4"
          className="mb-4"
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

        {/* Loading State */}
        {isLoading && !refreshing ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="mt-4 text-gray-600">Loading projects...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-red-500 text-center mb-4">
              Error loading projects. Please try again.
            </Text>
            <TouchableOpacity
              className="bg-blue-600 px-6 py-3 rounded-lg"
              onPress={() => refetch()}
            >
              <Text className="text-white font-medium">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#3B82F6']}
                tintColor="#3B82F6"
              />
            }
            className="flex-1"
          >
            {filteredProjects.length > 0 ? (
              <View className="px-4">
                {/* Projects List */}
                {filteredProjects.map((project) => (
                  <ProjectsComponent
                    key={project.id}
                    postedTime={`Posted ${formatTimeAgo(project.createdAt)}`}
                    projectName={project.title}
                    location={project.location}
                    description={project.description}
                    budget={project.budgetRange?.label || 'Budget not specified'}
                    duration={project.timeline?.label || 'Duration not specified'}
                    bids={String(project.bidCount || 0)}
                    status={project.status} // Pass status to component for badge display
                    onPress={() =>
                      navigation.navigate('ProjectDetails', { 
                        projectId: project.id 
                      })
                    }
                  />
                ))}
                
                {/* Pagination Info */}
                {pagination && (
                  <View className="py-6 items-center">
                    <Text className="text-gray-500 text-sm mb-2">
                      Showing {filteredProjects.length} of {pagination.total} projects
                    </Text>
                    {pagination.page < pagination.totalPages && (
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
                    {pagination.page === pagination.totalPages && pagination.totalPages > 1 && (
                      <Text className="text-gray-400 text-sm mt-2">
                        All projects loaded
                      </Text>
                    )}
                  </View>
                )}
              </View>
            ) : (
              <View className="px-4 pt-10">
                <EmptyScreenComponent 
                  title="No Projects Found"
                  message={
                    selectedFilter !== 'all' 
                      ? `No "${formatStatusLabel(selectedFilter)}" projects found` 
                      : searchQuery || locationFilter
                      ? "Try adjusting your search filters"
                      : "No projects available in the marketplace"
                  }
                />
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </AppLayout>
  );
};



export default FindprojectsScreen;