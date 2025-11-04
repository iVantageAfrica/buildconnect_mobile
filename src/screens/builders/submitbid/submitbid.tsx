import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { SubmitBidInput, submitBidSchema } from "@/src/schemas/dashboardschema";
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


const SubmitBidScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitBidInput>({
    resolver: zodResolver(submitBidSchema),
    defaultValues: {
      bidAmount: 0,
      proposedTimeline: "",
      projectProposal: "",
      milestones: [
        {
          milestoneName: "",
          completionDate: "",
          paymentAmount: 0,
        },
      ],
      portfolioReference: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "milestones",
  });


   const {submitBidMutation, submitBidSuccess} = useProjects()
    const onSubmit = (data: SubmitBidInput) => {
       submitBidMutation.mutate(data);
    };

    if(submitBidSuccess){
   return (
      <SuccessScreen
  title="Bid Submitted"
  message="Your bid has been successfully submitted. The client will be notified. "
  navigateTo="SignIn"
  buttonTitle="View my Bids"
 />
  )
}
  

  return (
    <AppLayout screenName="Submit Bid">

      <Text className="font-inter px-3  pt-4 ">
        You are submitting a bid for the <Text className="text-lg font-interbold">Modern Bungalow Build Project</Text>
      </Text>

      <View className="px-3">
        <View>
          <Controller
            control={control}
            name="bidAmount"
            render={({ field }) => (
              <FormInput
                placeholder="Enter bid amount"
                label="Bid Amount"
                value={String(field.value)}
                hasError={!!errors.bidAmount}
                onChangeText={(text) => field.onChange(Number(text))}
                keyboardType="numeric"
              />
            )}
          />
          {errors.bidAmount && (
            <Text className="font-inter pt-1 text-red-500 text-sm">
              {errors.bidAmount.message}
            </Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="proposedTimeline"
            render={({ field }) => (
              <FormInput
                placeholder="e.g., 3 months"
                label="Proposed Timeline"
                value={field.value}
                hasError={!!errors.proposedTimeline}
                onChangeText={field.onChange}
              />
            )}
          />
          {errors.proposedTimeline && (
            <Text className="font-inter pt-1 text-red-500 text-sm">
              {errors.proposedTimeline.message}
            </Text>
          )}
        </View>

        <View className="pt-4">
          <Controller
            control={control}
            name="projectProposal"
            render={({ field }) => (
              <FormTextArea
                label="Project Proposal"
                placeholder="Briefly introduce yourself and why you're a good fit for this project..."
                value={field.value}
                onChangeText={field.onChange}
                hasError={!!errors.projectProposal}
                errorMessage={errors.projectProposal?.message}
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

              <View>
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
          name="portfolioReference"
          render={() => (
            <ImageUploadComponent
            title="click to uplaod or drag and drop"
            image={reportImage}
            label={"Portfolio & Reference"}
            note="PNG, JPG, PDF(max. 5MB)"
              control={control}
              name="portfolioReference"
              error={errors.portfolioReference?.message as string | undefined}
            />
          )}
        />
      </View>

     <View className="pt-6">
          <GradientButton loading={submitBidMutation.isPending} title="Submit Bid" onPress={handleSubmit(onSubmit)} />
        </View>

      </View>
    </AppLayout>
  );
};

export default SubmitBidScreen;