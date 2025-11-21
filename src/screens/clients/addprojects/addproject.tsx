import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { AddProjectInput, addProjectSchema } from "@/src/schemas/dashboardschema";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/src/components/Forms/Formnput";
import { FormTextArea } from "@/src/components/Forms/TextArea";
import { FormDatePicker } from "@/src/components/Forms/DatePicker";
import { X, Plus } from "lucide-react-native";
import ImageUploadComponent from "@/src/components/Forms/ImageForm";
import { reportImage } from "@/src/constants/icon";
import GradientButton from "@/src/components/Buttons/GradientButton";
import { useProjects } from "@/src/core/hooks/useProjects";
import SuccessScreen from "@/src/components/Notifications/SucessScreen";
import AppLayout from "@/src/components/Layouts/AppLayout";
import DropdownField from "@/src/components/Forms/DropDown";
import { budget } from "@/src/utils/data";

const AddProject = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProjectInput>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      projectName: "",
      projectType: "",
      location: "",
      budget: "",
      startDate: "",
      endDate: "",
      description: "",
      milestones: [
        {
          milestoneName: "",
          completionDate: "",
          paymentAmount: 0,
        },
      ],
      projectMedia: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "milestones",
  });

  const { submitBidMutation, submitBidSuccess } = useProjects();


  const onSubmit = (data: AddProjectInput) => {
    submitBidMutation.mutate(data);
  };


  if (submitBidSuccess) {
    return (
      <SuccessScreen
        title="Project Posted Successfully"
        message={`Your project has been posted. Builders will start submitting bids soon`} 
        navigateTo="SignIn"
        buttonTitle="View my Projects" 
      />
    );
  }

  return (
    <AppLayout screenName="Add Project"> 
      <Text className="font-inter px-3 pt-4">
        Create a new project to get bids from builders
      </Text>

      <View className="px-3">
        <View>
          <Controller
            control={control}
            name="projectName"
            render={({ field }) => (
              <FormInput
                placeholder="Enter project name"
                label="Project Name"
                value={String(field.value)}
                hasError={!!errors.projectName}
                onChangeText={field.onChange}
              />
            )}
          />
          {errors.projectName && (
            <Text className="font-inter pt-1 text-red-500 text-sm">
              {errors.projectName.message}
            </Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="projectType"
            render={({ field }) => (
              <FormInput
                placeholder="Enter project type"
                label="Project Type"
                value={field.value}
                hasError={!!errors.projectType}
                onChangeText={field.onChange}
              />
            )}
          />
          {errors.projectType && (
            <Text className="font-inter pt-1 text-red-500 text-sm">
              {errors.projectType.message}
            </Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <FormInput
                placeholder="Enter project location" 
                label="Location"
                value={field.value}
                hasError={!!errors.location}
                onChangeText={field.onChange}
              />
            )}
          />
          {errors.location && (
            <Text className="font-inter pt-1 text-red-500 text-sm">
              {errors.location.message}
            </Text>
          )}
        </View>

        <View className="pt-3 pb-2">
          <DropdownField
            name="budget"
            control={control}
            label="Budget"
            placeholder="Select budget range"
            data={budget}
            error={errors.budget?.message as string}
          />
        </View>

        <View className="flex-row justify-between">
          <View className="pt-3 flex-1 mr-2"> 
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormDatePicker
                  label="Start Date"
                  value={field.value ? new Date(field.value) : new Date()}
                  onChange={(date) => field.onChange(date.toISOString())}
                  hasError={!!errors.startDate}
                  errorMessage={errors.startDate?.message}
                />
              )}
            />
          </View>

          <View className="pt-3 flex-1 ml-2">
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <FormDatePicker
                  label="End Date"
                  value={field.value ? new Date(field.value) : new Date()}
                  onChange={(date) => field.onChange(date.toISOString())}
                  hasError={!!errors.endDate}
                  errorMessage={errors.endDate?.message}
                />
              )}
            />
          </View>
        </View>

        <View className="pt-4">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <FormTextArea
                label="Description"
                placeholder="Describe your project requirements..."
                value={field.value}
                onChangeText={field.onChange}
                hasError={!!errors.description}
                errorMessage={errors.description?.message}
                width="w-full"
              />
            )}
          />
        </View>

        <View className="mt-4 mx-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-worksanssemibold text-xl">Milestones</Text>
            <TouchableOpacity
              onPress={() =>
                append({
                  milestoneName: "",
                  completionDate: "",
                  paymentAmount: 0,
                })
              }
              className="flex-row gap-2 items-center"
            >
              <Plus size={20} color="#2563eb" />
              <Text className="text-blue-600 font-inter">Add milestone</Text>
            </TouchableOpacity>
          </View>

          {fields.map((field, index) => (
            <View key={field.id} className="border border-gray-300 rounded-xl p-4 mb-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-inter text-xl">Milestone {index + 1}</Text>
                {fields.length > 1 && (
                  <TouchableOpacity onPress={() => remove(index)}>
                    <X size={24} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>

              <View>
                <Controller
                  control={control}
                  name={`milestones.${index}.milestoneName`}
                  render={({ field }) => (
                    <FormInput
                      placeholder="Foundation"
                      label="Milestone Name"
                      value={field.value}
                      hasError={!!errors.milestones?.[index]?.milestoneName}
                      onChangeText={field.onChange}
                    />
                  )}
                />
                {errors.milestones?.[index]?.milestoneName && (
                  <Text className="font-inter pt-1 text-red-500 text-sm">
                    {errors.milestones[index]?.milestoneName?.message}
                  </Text>
                )}
              </View>

              <View className="pt-3">
                <Controller
                  control={control}
                  name={`milestones.${index}.completionDate`}
                  render={({ field }) => (
                    <FormDatePicker
                      label="Completion Date"
                      value={field.value ? new Date(field.value) : new Date()}
                      onChange={(date) => field.onChange(date.toISOString())}
                      hasError={!!errors.milestones?.[index]?.completionDate}
                      errorMessage={errors.milestones?.[index]?.completionDate?.message}
                    />
                  )}
                />
              </View>

              <View className="pt-3">
                <Controller
                  control={control}
                  name={`milestones.${index}.paymentAmount`}
                  render={({ field }) => (
                    <FormInput
                      placeholder="Enter amount"
                      label="Payment Amount"
                      value={String(field.value)}
                      hasError={!!errors.milestones?.[index]?.paymentAmount}
                      onChangeText={(text) => field.onChange(Number(text))}
                      keyboardType="numeric"
                    />
                  )}
                />
                {errors.milestones?.[index]?.paymentAmount && (
                  <Text className="font-inter pt-1 text-red-500 text-sm">
                    {errors.milestones[index]?.paymentAmount?.message}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View>
          <Controller
            control={control}
            name="projectMedia"
            render={() => (
              <ImageUploadComponent
                title="Click to upload or drag and drop" 
                image={reportImage}
                label="Project Media (Optional)"
                note="PNG, JPG, PDF (max. 5MB)"
                control={control}
                name="projectMedia"
                error={errors.projectMedia?.message as string | undefined}
              />
            )}
          />
        </View>

        <View className="pt-6">
          <GradientButton 
            loading={submitBidMutation.isPending} 
            title="Create Project" 
            onPress={handleSubmit(onSubmit)} 
          />
        </View>
      </View>
    </AppLayout>
  );
};

export default AddProject;