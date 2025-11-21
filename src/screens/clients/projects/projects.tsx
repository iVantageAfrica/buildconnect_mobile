
import AppLayout from '@/src/components/Layouts/AppLayout'
import EmptyScreenComponent from '@/src/components/Miscallaneous/EmptyScreenComponent'
import { PROJECTS } from '@/src/utils/data'
import React, { useState } from 'react'
import { View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import ProjectsWithMilestone from "@/src/components/Cards/ProjectsWithMileStone";
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/src/navigation/RootNavigator'

const ClientProjectsScreen = ({ navigation }: any) => {
  const filters = [
    { id: 'all', label: 'All', count: 5 },
    { id: 'active', label: 'Active', count: 3 },
    { id: 'pending', label: 'Pending', count: 1 },
    { id: 'completed', label: 'Completed', count: 1 },
  ];
    const [selected, setSelected] = useState('all');

  return (
    <AppLayout screenName={"Projects"}>

       <View className="mt-8 ">
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
        <EmptyScreenComponent />
      )}
    
             
              </View>
    </AppLayout>
  )
}

export default ClientProjectsScreen

