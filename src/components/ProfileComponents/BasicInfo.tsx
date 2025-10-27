import { View, Text } from "react-native";
import React from "react";
import { useFormContext, Controller, useFormState } from "react-hook-form";
import ImageUploadComponent from "../Forms/ImageForm";
import DropdownField from "../DropDown";
import FormInput from "../Forms/Formnput";
import { camera } from "@/src/constants/icon";

const BasicInfo = () => {
  const {
    control,
  } = useFormContext();
const { errors } = useFormState({ control });
  const serviceAreas = [
    { label: "5 miles", value: "5" },
    { label: "10 miles", value: "10" },
    { label: "15 miles", value: "15" },
    { label: "20 miles", value: "20" },
    { label: "25 miles", value: "25" },
    { label: "30+ miles", value: "30" },
  ];

  const experienceYears = [
    { label: "1-2 years", value: "1-2" },
    { label: "3-5 years", value: "3-5" },
    { label: "6-9 years", value: "6-9" },
    { label: "10-15 years", value: "10-15" },
    { label: "16+ years", value: "16+" },
  ];

  return (
    <View className="flex-1">
      <View>
        <Text className="font-interbold text-2xl">Basic Profile</Text>
        <Text className="font-inter text-base pt-2 text-md">
          Tell us about yourself and your business location
        </Text>
      </View>

      <View className="pt-10">
        <Controller
          control={control}
          name="profilePhoto"
          render={() => (
            <ImageUploadComponent
            title="Upload your professional photo"
            image={camera}
            label={"Profile Photo"}
            note="Builders with photos get 3x more responses"
              control={control}
              name="profilePhoto"
              error={errors.profilePhoto?.message as string | undefined}
            />
          )}
        />

        <View className="pt-6 gap-4">
          <View>
            <Controller
              control={control}
              name="businessName"
              render={({ field }) => (
                <FormInput
                  placeholder="Business Name"
                  label="Business Name"
                  value={field.value}
                  hasError={!!errors.businessName}
                  onChangeText={field.onChange}
                />
              )}
            />
            {errors.businessName && (
              <Text className="text-red-500 font-inter text-sm mt-1">
                {errors.businessName.message as string}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <FormInput
                  placeholder="Location"
                  label="Location"
                  value={field.value}
                  hasError={!!errors.location}
                  onChangeText={field.onChange}
                />
              )}
            />
            {errors.location && (
              <Text className="text-red-500 font-inter text-sm mt-1">
                {errors.location.message as string}
              </Text>
            )}
          </View>

          <DropdownField
            name="serviceRadius"
            control={control}
            label="Service Radius (miles)"
            placeholder="Select service area"
            data={serviceAreas}
            error={errors.serviceRadius?.message as string}
          />

          <DropdownField
            name="yearOfExperience"
            control={control}
            label="Years of Experience"
            placeholder="Select experience level"
            data={experienceYears}
            error={errors.yearOfExperience?.message as string}
          />
        </View>
      </View>
    </View>
  );
};

export default BasicInfo;
