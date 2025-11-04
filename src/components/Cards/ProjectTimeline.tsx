import React from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { Check } from "lucide-react-native";

interface TimelineItem {
  id: number;
  title: string;
  target: string;
  status: "completed" | "current" | "pending";
}

const timelineData: TimelineItem[] = [
  { id: 1, title: "Planning", target: "2025-02-15", status: "completed" },
  { id: 2, title: "Foundation", target: "2025-06-15", status: "completed" },
  { id: 3, title: "Framing", target: "2025-07-29", status: "current" },
  { id: 4, title: "Interior", target: "2025-09-26", status: "pending" },
  { id: 5, title: "Finishes", target: "2025-11-05", status: "pending" },
  { id: 6, title: "Completion", target: "2025-11-05", status: "pending" },
];

const StatusIcon: React.FC<{ status: TimelineItem["status"] }> = ({ status }) => {
  switch (status) {
    case "completed":
      return (
        <View className="w-10 h-10 rounded-full bg-blue-600 items-center justify-center">
          <Check width={20} height={20} color="#fff" strokeWidth={3} />
        </View>
      );

    case "current":
      return <View className="w-10 h-10 rounded-full border-4 border-blue-600 bg-white" />;

    default:
      return <View className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white" />;
  }
};

const getLineColor = (status: string, nextStatus?: string): string => {
  if (status === "completed" && (nextStatus === "completed" || nextStatus === "current"))
    return "bg-blue-600";
  return "bg-red-400";
};

interface RowProps {
  item: TimelineItem;
  index: number;
  nextStatus?: TimelineItem["status"];
}

const Row: React.FC<RowProps> = ({ item, index, nextStatus }) => {
  return (
    <View className="relative">
      <View className="flex-row items-start gap-4 px-4 py-3">
        <View className="w-12 items-center">
          <StatusIcon status={item.status} />
        </View>

        <View className="flex-1 pr-2">
          <Text className="text-lg font-inter text-gray-900">{item.title}</Text>
          <Text className="text-sm font-inter mt-1">Target: {item.target}</Text>
        </View>
      </View>

      {index < timelineData.length - 1 && (
        <View
          className={`${getLineColor(item.status, nextStatus)} absolute left-11 top-16 w-0.5`}
          style={{ height: 64 }}
        />
      )}
    </View>
  );
};

const ProjectTimeline: React.FC = () => {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white rounded-lg shadow-sm p-4">
        <Text className="text-2xl font-interbold mb-4">Project Timeline</Text>

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
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

export default ProjectTimeline;