import { View, Text } from "react-native";
import React from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import ImageUploadComponent from "../Forms/ImageForm";
import { camera } from "@/src/constants/icon";
import DropdownField from "../DropDown";
import ChooseTypeForm from "../ChooseTypeForm";
import { availableDayList, daysOfWeek, timeSlots } from "@/src/utils/data";

const Portfolio = () => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

 

  return (
 
      <View>
        <Text className="font-interbold text-2xl">Showcase Your Work</Text>
        <Text className="font-inter text-base pt-2 text-md">
          Add photo of your best projects here
        </Text>
        <View>
          <Controller
            control={control}
            name="profilePhoto"
            render={() => (
              <ImageUploadComponent
                title="Add photo of your work"
                image={camera}
                label={"Business/Contractor License"}
                note="PNG, JPG, PDF(max. 5MB)"
                control={control}
                name="projectPhoto"
                error={errors.projectPhoto?.message as string | undefined}
              />
            )}
          />
        </View>

        <View className="my-4">
          <Text className="text-xl font-interbold">Working hours</Text>
        </View>
        <View className="flex-row gap-6 pt-4">
          <View className="flex-1">
            <DropdownField
              name="startTime"
              control={control}
              label="Start time"
              placeholder="Select start time"
              data={timeSlots}
              error={errors.startTime?.message as string}
            />
          </View>
          <View className="flex-1">
            <DropdownField
              name="endTime"
              control={control}
              label="end time"
              placeholder="Select end time"
              data={timeSlots}
              error={errors.endTime?.message as string}
            />
          </View>
        </View>

     <View className="mt-5">
      <ChooseTypeForm
        control={control}
        title="Available Days"
        data={daysOfWeek}
        name="availableDays"
        rules={{ required: true }}
      />
      {errors.availableDays&& (
        <Text className="text-red-500 text-center font-inter font-inter ">
          {errors.availableDays.message as string}
        </Text>
      )}
    </View>

        <View className="my-4">
        <Text className="text-xl font-interbold ">Current Availabilty</Text>
       </View>

<View>
  <DropdownField
              name="availableTime"
              control={control}
              label="Available Time"
              placeholder="Select available time"
              data={availableDayList}
              error={errors.availableTime?.message as string}
            />
</View>
       

      </View>

  );
};

export default Portfolio;
