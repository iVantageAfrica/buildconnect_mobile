import { useAuthStore } from "@/src/store/Authstore";
import { useNavigation } from "@react-navigation/native";
import { AuthService } from "../services/auth/AuthService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";
import { ProjectService } from "../services/projects/ProjectService";
import { Project, ProjectsResponse } from "../services/projects/projectTypes";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { useState } from "react";

// Re-export types for backward compatibility
export type { Project, ProjectsResponse } from "../services/projects/projectTypes";

export const useProjects = () => {
  const [submitBidSuccess, setSubmitBidSuccess] = useState(false);

  const { setAuthData } = useAuthStore();
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // QUERIES
  const { data: projectsData, isLoading: isLoadingProjects, error: projectsError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await ProjectService.getProjects();
      const responseData = response.data as ProjectsResponse;
          
      if (Array.isArray(responseData?.data?.projects) && responseData.data.projects.length > 0) {
        console.log("=== FIRST PROJECT EXAMPLE ===");
        console.log(JSON.stringify(responseData.data.projects[0], null, 2));
      }
      return responseData;
    },
  });

  //MUTATIONS
  const createProjectMutation = useMutation({
    mutationFn: ProjectService.createProject,
    onSuccess: (res: any) => {
      const responseData = res?.data;
      if (
        (responseData.statusCode === 200 || responseData.statusCode === 201) &&
        responseData.success === true
      ) {
        Toast.show({
          type: "success",
          text1: "Project Created",
          text2: "Your project has been created successfully",
        });
        setSubmitBidSuccess(true);
      }
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Create Project Failed",
        text2: error?.response?.data?.message || error instanceof Error ? error.message : "Failed to create project",
      });
    },
  });


  const projectsMarketPlaceQuery = ( params: object) => {
  return useQuery({
    queryKey: ['getProjectQueryMarketplace',  params], 
    queryFn: () => ProjectService.getProjectsMarketPlace(params),
  });
};


 const singleProjectMarketPlaceQuery = (id :any) => {
    return useQuery({
      queryKey: ['getProjectSingleQueryMarketplace', id], 
      queryFn: () => ProjectService.getSingleProjectsMarketPlace(id),
    });
  };
   // Legacy mutation for backward compatibility
  const submitBidMutation = createProjectMutation;

  const projects = Array.isArray(projectsData?.data?.projects) ? projectsData.data.projects : [];
  
  return {
    submitBidMutation,
    submitBidSuccess,
    projects,
    isLoadingProjects,
    projectsError,
   projectsMarketPlaceQuery,
   singleProjectMarketPlaceQuery
  };
};
