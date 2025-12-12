import { ENDPOINTS } from "@/src/constants/endpoints";
import axiosInstance from "../axios";

export interface CreateProjectPayload {
  title: string;
  description: string;
  location: string;
  projectTypeId: string;
  budgetRangeId: string;
  timelineId?: string;
  startDate: string;
  endDate: string;
  milestones: Array<{
    name: string;
    description?: string;
    completionDate: string;
    amount: number;
  }>;
  mediaFileIds: string[];
  fileIds: string[];
  metadata: Record<string, any>;
}

export const ProjectService = {
  getProjects: () => axiosInstance.get(ENDPOINTS.PROJECTS.GET_PROJECTS),
  createProject: (data: CreateProjectPayload) => 
    axiosInstance.post(ENDPOINTS.PROJECTS.CREATE_PROJECT, data),
};

