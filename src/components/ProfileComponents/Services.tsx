import { View, Text } from "react-native";
import React from "react";
import ChooseTypeForm from "../ChooseTypeForm";
import { useFormContext, useFormState } from "react-hook-form";

const Services = () => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });
 const data =  [
    { id: 'home', label: 'Home Renovation', value: 'Home Renovation' },
    { id: 'new', label: 'New Construction', value: 'New Construction' },
    { id: 'commercial', label: 'Commercial Build', value: 'Commercial Build' },
    { id: 'landscaping', label: 'Landscaping', value: 'Landscaping' },
    { id: 'others', label: 'Others', value: 'Others' },
  ]
  return (
    <View>
      <ChooseTypeForm
        control={control}
        data={data}
        title="What project are you planning?"
        name="services"
        rules={{ required: true }}
      />
      {errors.services && (
        <Text className="text-red-500 text-center font-inter mt-1">
          {errors.services.message as string}
        </Text>
      )}
    </View>
  );
};

export default Services;
