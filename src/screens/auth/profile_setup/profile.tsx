import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import BasicInfo from "@/src/components/ProfileComponents/BasicInfo";
import ProfessionalDocumentation from "@/src/components/ProfileComponents/ProfessionalDocumentation";
import Services from "@/src/components/ProfileComponents/Services";
import Portfolio from "@/src/components/ProfileComponents/Portfolio";
import SuccessScreen from "@/src/components/ProfileComponents/ProfileSuccessScreen";
import KeyboardAvoidingLayout from "@/src/components/KeyboardAvoidLayout";
import GradientButton from "@/src/components/Buttons/GradientButton";
import { arrowleft } from "@/src/constants/icon";
import { fullProfileSchema, FullProfileInput } from "@/src/schemas/authschema";
import ProfileSuccessScreen from "@/src/components/ProfileComponents/ProfileSuccessScreen";

export default function ProfileScreen() {
  const [step, setStep] = useState(1);

  const methods = useForm<FullProfileInput>({
    resolver: zodResolver(fullProfileSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      businessName: "",
      location: "",
      serviceRadius: "",
      yearOfExperience: "",
      profilePhoto: null,
      contractorLicense: null,
      insuranceDocumentation: null,
      additionalInformation: null,
      services: [],
      availableDays:[],
      availableTime:"",
      projectPhoto:null,
      startTime:"",
      endTime:""
    },
  })

  const { handleSubmit, reset, trigger, getValues, formState } = methods;


  const stepFieldsMap: Record<number, (keyof FullProfileInput)[]> = {
    1: ["businessName", "location", "serviceRadius", "yearOfExperience", "profilePhoto"],
    2: ["contractorLicense", "insuranceDocumentation", "additionalInformation"],
    3: ["services"],
    4: ["startTime","endTime", "availableDays", "projectPhoto", "availableTime"],
  };

  const handleStepContinue = async () => {
    const fields = stepFieldsMap[step];
    const valid = await trigger(fields);

    if (valid) {
      setStep((prev) => prev + 1);
      console.log(`✅ Step ${step} valid data:`, getValues());
    } else {
      console.log(`❌ Step ${step} validation errors:`, formState.errors);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: FullProfileInput) => {
    console.log("✅ Final submission:", data);
    setStep(5);
  };

  const stepTitles = ["Profile", "Professional Documents", "Services", "Portfolio"];

  return (
    <KeyboardAvoidingLayout androidExtraPadding={40}>
      <FormProvider {...methods}>
        <View className="p-4 flex-1">
          <View className="flex-row justify-between items-center mb-4">
            {step > 1 && step < 5 && (
              <TouchableOpacity onPress={prevStep}>
                <Image
                  source={arrowleft}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            {step < 5 && (
              <Text className="text-center font-interbold text-xl">
                {stepTitles[step - 1]}
              </Text>
            )}
            <View style={{ width: 25 }} />
          </View>


          <View className="pt-10 flex-1">
            <View style={{ display: step === 1 ? "flex" : "none" }}>
              <BasicInfo />
            </View>
            <View style={{ display: step === 2 ? "flex" : "none" }}>
              <ProfessionalDocumentation />
            </View>
            <View style={{ display: step === 3 ? "flex" : "none" }}>
              <Services />
            </View>
            <View style={{ display: step === 4 ? "flex" : "none" }}>
              <Portfolio />
            </View>
            <View style={{ display: step === 5 ? "flex" : "none" }}>
             <ProfileSuccessScreen/>
            </View>
          </View>

  {step >= 1 && step <= 4 && (
  <View className="pb-4 pt-6">
    <GradientButton
      title={step === 4 ? "Complete Setup" : "Continue"}
      onPress={step === 4 ? handleSubmit(onSubmit) : handleStepContinue}
    />
  </View>
)}

        </View>
      </FormProvider>
    </KeyboardAvoidingLayout>
  );
}
