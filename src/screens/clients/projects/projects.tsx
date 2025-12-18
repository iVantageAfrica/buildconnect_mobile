
import AppLayout from '@/src/components/Layouts/AppLayout'
import EmptyScreenComponent from '@/src/components/Miscallaneous/EmptyScreenComponent'
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/src/navigation/RootNavigator'
import ProjectsComponent from '@/src/components/Cards/ProjectsComponent'
import { useProjects } from '@/src/core/hooks/useProjects'

const ClientProjectsScreen = ({ navigation }: any) => {
  const { projects, isLoadingProjects, projectsError } = useProjects();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const filters = [
    { id: 'all', label: 'All', count: projects.length },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'pending', label: 'Pending', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
  ];
  const [selected, setSelected] = useState('all');

  const handleAddProject = () => {
    nav.navigate('AddProject');
  };

  return (
    <AppLayout screenName={"Projects"}>

       <View className="mt-8 flex-1">
                <ScrollView
                         horizontal
                         showsHorizontalScrollIndicator={false}
                         contentContainerClassName="px-4 gap-2"
                       >
                         {filters.map((filter) => (
                           <TouchableOpacity
                             key={filter.id}
                             className={`px-5 py-2.5 rounded-full border ${
                               selected === filter.id
                                 ? 'bg-blue-600 border-blue-600'
                                 : 'bg-white border-gray-200'
                             }`}
                             onPress={() => setSelected(filter.id)}
                           >
                             <Text
                               className={`text-sm font-inter font-medium ${
                                 selected === filter.id ? 'text-white' : 'text-gray-800'
                               }`}
                             >
                               {filter.label} ({filter.count})
                             </Text>
                           </TouchableOpacity>
                         ))}
                       </ScrollView>
               
    
            
        {isLoadingProjects ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2463EB" />
          </View>
        ) : projectsError || !projects || projects.length === 0 ? (
          <EmptyScreenComponent />
        ) : (
          <>
            {projects.slice(0, 2).map((project) => (
              <ProjectsComponent
                key={project.id}
                postedTime="Posted 1 hour ago"
                projectName={project.title}
                location={project.location}
                description={project.description}
                budget={project.budgetRange?.label || "N/A"}
                duration={project.timeline?.label || "N/A"}
                bids="0"
                onPress={() =>
                  navigation.navigate('ClientProjectDetails', { projectId: project.id })
                }
              />
            ))}
          </>
        )}
      </View>
    </AppLayout>
  )
}

export default ClientProjectsScreen

