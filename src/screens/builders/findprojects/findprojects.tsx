
import Search from '@/src/components/Forms/Search';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PROJECTS } from '@/src/utils/data';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import AppLayout from '@/src/components/Layouts/AppLayout';
import ProjectsComponent from '@/src/components/Cards/ProjectsComponent';
import EmptyScreenComponent from '@/src/components/Miscallaneous/EmptyScreenComponent';

const FindprojectsScreen = () => {
  const [selected, setSelected] = useState('all');
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const filters = [
    { id: 'all', label: 'All Projects', count: 5 },
    { id: 'residential', label: 'Residential', count: 3 },
    { id: 'commercial', label: 'Commercial', count: 1 },
    { id: 'renovations', label: 'Renovations', count: 1 },
  ];

  return (
    <AppLayout screenName="Project Marketplace">
      <View className="pt-3">
        <Search />
      </View>

      <View className="flex-1 bg-gray-100 pt-12">
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

      <ScrollView showsVerticalScrollIndicator={false}>
  {PROJECTS.length > 0 ? (
    PROJECTS.map((project) => (
      <ProjectsComponent
        key={project.id}
        postedTime="Posted 1 hour ago"
        projectName={project.projectname}
        location={project.location}
        description={project.description}
        budget={project.budget}
        duration={project.duration}
        bids={project.bids}
         onPress={() =>
          navigation.navigate('ProjectDetails', { projectId: project.id })
        }
      />
    ))
  ) : (
    <EmptyScreenComponent/>
  )}
</ScrollView>

      </View>
    </AppLayout>
  );
};

export default FindprojectsScreen;
