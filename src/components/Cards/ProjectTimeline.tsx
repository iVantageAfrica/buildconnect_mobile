import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from "react-native";
import { Check, ChevronDown } from "lucide-react-native";

interface TimelineItem {
  id: string;
  title: string;
  targetDate: string;
  status: "completed" | "current" | "pending";
  description?: string;
}

interface ProjectTimelineProps {
  milestones?: Array<{
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    status?: string;
    completedAt?: string;
  }>;
}

const StatusIcon: React.FC<{ status: TimelineItem["status"] }> = ({ status }) => {
  switch (status) {
    case "completed":
      return (
        <View className="w-12 h-12 rounded-full bg-blue-600 items-center justify-center">
          <Check width={24} height={24} color="#fff" strokeWidth={3} />
        </View>
      );

    case "current":
      return <View className="w-12 h-12 rounded-full border-[6px] border-blue-600 bg-white" />;

    default:
      return <View className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white" />;
  }
};

const getLineColor = (status: string, nextStatus?: string): string => {
  if (status === "completed" && (nextStatus === "completed" || nextStatus === "current"))
    return "bg-blue-600";
  return "bg-gray-300";
};

const getStatusFromMilestone = (milestone: any): "completed" | "current" | "pending" => {
  if (milestone.completedAt) return "completed";
  if (milestone.status === 'in_progress') return "current";
  return "pending";
};

interface RowProps {
  item: TimelineItem;
  index: number;
  nextStatus?: TimelineItem["status"];
}

const Row: React.FC<RowProps> = ({ item, index, nextStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="relative">
      <View className="flex-row items-start gap-4">
        <View className="w-12 items-center relative">
          <StatusIcon status={item.status} />
          {index < timelineData.length - 1 && (
            <View className={`w-0.5 h-20 mt-1 ${getLineColor(item.status, nextStatus)}`} />
          )}
        </View>

        <View className="flex-1 pt-2">
          <TouchableOpacity 
            className="flex-row items-center gap-2" 
            onPress={() => setIsOpen(!isOpen)}
            activeOpacity={0.7}
          >
            <Text className="text-xl font-semibold text-gray-900">{item.title}</Text>
            <ChevronDown 
              width={20} 
              height={20} 
              color="#6b7280"
              style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
            />
          </TouchableOpacity>
          <Text className="text-sm text-gray-500 mt-1">Target: {item.targetDate}</Text>
          
          {isOpen && item.description && (
            <Text className="text-gray-600 mt-2">{item.description}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ milestones = [] }) => {
  // Convert API milestones to timeline format
  const timelineData: TimelineItem[] = milestones.map((milestone, index) => ({
    id: milestone.id || `milestone-${index}`,
    title: milestone.title || `Milestone ${index + 1}`,
    targetDate: milestone.dueDate 
      ? new Date(milestone.dueDate).toLocaleDateString()
      : "Not set",
    status: getStatusFromMilestone(milestone),
    description: milestone.description,
  }));


  if (milestones.length === 0) {
    return (
      <View className="flex-1 bg-gray-100 p-4 justify-center">
        <View className="bg-white rounded-2xl p-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">Project Milestones</Text>
          <Text className="text-gray-500 text-center py-8">
            No milestones have been added to this project yet.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4 justify-center">
      <View className="bg-white rounded-2xl p-6">
        <Text className="text-xl font-bold text-gray-900 mb-8">Project Milestones</Text>

        <FlatList
          data={timelineData}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item, index }: ListRenderItemInfo<TimelineItem>) => (
            <Row
              item={item}
              index={index}
              nextStatus={timelineData[index + 1]?.status}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ProjectTimeline;