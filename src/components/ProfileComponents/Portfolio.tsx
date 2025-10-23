import { View, Text } from "react-native";
import React from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";
import ImageUploadComponent from "../Forms/ImageForm";
import { camera } from "@/src/constants/icon";
import DropdownField from "../DropDown";
import ChooseTypeForm from "../ChooseTypeForm";

const Portfolio = () => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

  const timeSlots = [];

  for (let h = 0; h < 24; h++) {
    const hour = h.toString().padStart(2, "0");
    timeSlots.push({ label: `${hour}:00`, value: `${hour}:00` });
  }
const daysOfWeek = [
  { id: 'mon', label: 'Monday', value: 'Monday' },
  { id: 'tue', label: 'Tuesday', value: 'Tuesday' },
  { id: 'wed', label: 'Wednesday', value: 'Wednesday' },
  { id: 'thu', label: 'Thursday', value: 'Thursday' },
  { id: 'fri', label: 'Friday', value: 'Friday' },
  { id: 'sat', label: 'Saturday', value: 'Saturday' },
  { id: 'sun', label: 'Sunday', value: 'Sunday' },
];

  const availableDayList = [
    { label: "Available Immediately", value: "Available Immediately" },
    { label: "Available in Week", value: "Available in Week" },
    { label: "Available in 2 week", value: "Available in 2 week" },
    { label: "Available in 1 month", value: "Available in 1 month" },
    { label: "Currently Booked", value: "Currently Booked" },
  ];

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
