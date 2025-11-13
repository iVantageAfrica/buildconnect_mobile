import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import GradientButton from "@/src/components/Buttons/GradientButton";
import KeyboardAvoidingLayout from "@/src/components/Layouts/KeyboardAvoidLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import DropdownField from "@/src/components/Forms/DropDown";
import { FormTextArea } from "@/src/components/Forms/TextArea";
import PageHeader from "@/src/components/Miscallaneous/PageHeader";
import { LookupService } from "@/src/core/services/lookup/LookupService";

const createProjectSchema = z.object({
  projectType: z.string().min(1, "Project type is required"),
  timeline: z.string().min(1, "Timeline is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type CreateProjectScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateProject"
>;

export default function CreateProjectScreen({
  navigation,
}: CreateProjectScreenProps) {
  // Fetch lookup data using React Query
  const { data: projectTypesData, isLoading: isLoadingProjectTypes } = useQuery({
    queryKey: ["projectTypes"],
    queryFn: async () => {
      const response = await LookupService.getProjectTypes();
      return response.data.data.items.map((item) => ({
        label: item.label,
        value: item.value,
      }));
    },
  });

  const { data: timelinesData, isLoading: isLoadingTimelines } = useQuery({
    queryKey: ["timelines"],
    queryFn: async () => {
      const response = await LookupService.getTimelines();
      return response.data.data.items.map((item) => ({
        label: item.label,
        value: item.value,
      }));
    },
  });

  const { data: budgetRangesData, isLoading: isLoadingBudgetRanges } = useQuery({
    queryKey: ["budgetRanges"],
    queryFn: async () => {
      const response = await LookupService.getBudgetRanges();
      return response.data.data.items.map((item) => ({
        label: item.label,
        value: item.value,
      }));
    },
  });

  const isLoading = isLoadingProjectTypes || isLoadingTimelines || isLoadingBudgetRanges;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectType: "",
      timeline: "",
      budgetRange: "",
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Create Project Data:", data);
    navigation.replace("AccountSuccess");
  };

  const handleSkip = () => {
    navigation.replace("AccountSuccess");
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("VerifyIdentity");
    }
  };

  return (
    <KeyboardAvoidingLayout>
      <View className="px-4 flex-1">
        <PageHeader title="Tell us About Your Project" onBackPress={handleBack} />

        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#007bff" />
            <Text className="mt-4 text-gray-600 font-inter">Loading project options...</Text>
          </View>
        ) : (
          <View className="space-y-6">
            <Text className="font-interbold text-lg px-4">Project Details</Text>

            {/* Project Type */}
            <View className="px-4 pt-8">
              <DropdownField
                name="projectType"
                control={control}
                label="Project Type"
                placeholder="Select project type"
                data={projectTypesData || []}
                error={errors.projectType?.message as string}
                disabled={isLoading}
              />
            </View>

            {/* Timeline */}
            <View className="px-4 pt-4">
              <DropdownField
                name="timeline"
                control={control}
                label="Timeline"
                placeholder="Select project timeline"
                data={timelinesData || []}
                error={errors.timeline?.message as string}
                disabled={isLoading}
              />
            </View>

            {/* Budget Range */}
            <View className="px-4 pt-4">
              <DropdownField
                name="budgetRange"
                control={control}
                label="Budget Range"
                placeholder="Select budget range"
                data={budgetRangesData || []}
                error={errors.budgetRange?.message as string}
                disabled={isLoading}
              />
            </View>

            {/* Description */}
            <View className="px-4 pt-4">
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <FormTextArea
                    label="Description"
                    placeholder="Describe your project requirements, goal, and any specific details..."
                    value={value}
                    onChangeText={onChange}
                    hasError={!!errors.description}
                    errorMessage={errors.description?.message as string}
                    numberOfLines={6}
                    minHeight={150}
                  />
                )}
              />
            </View>
          </View>
        )}

        <View className="pt-16 pb-4 space-y-3">
          <GradientButton
            title="Complete Setup"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
          <TouchableOpacity
            onPress={handleSkip}
            className="py-4 items-center text-black"
            disabled={isLoading}
          >
            <Text className="text-gray-500 font-inter text-base">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingLayout>
  );
}

