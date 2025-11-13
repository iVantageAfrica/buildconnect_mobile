import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import KeyboardAvoidingLayout from "@/src/components/Layouts/KeyboardAvoidLayout";
import GradientButton from "@/src/components/Buttons/GradientButton";
import { arrowleft } from "@/src/constants/icon";
import { z } from "zod";
import Portfolio from "./components/Portfolio";
import { useBuilderProfileStore } from "@/src/store/BuilderProfileStore";

type PortfolioScreenProps = NativeStackScreenProps<RootStackParamList, "BuilderPortfolio">;

const portfolioSchema = z.object({
  projectPhoto: z
    .object({
      uri: z.string(),
      name: z.string().optional(),
      type: z.string().optional(),
    })
    .nullable()
    .refine((val) => !!val, {
      message: "Project photo is required",
    }),
  startTime: z.string().min(1, "Select start time"),
  endTime: z.string().min(1, "Select end time"),
  availableDays: z.array(z.string()).min(1, "Select available days"),
  availableTime: z.string().min(1, "Available time is required"),
});

type PortfolioInput = z.infer<typeof portfolioSchema>;

export default function PortfolioScreen({ navigation }: PortfolioScreenProps) {
  const { formData, setFormData, clearFormData } = useBuilderProfileStore();

  const methods = useForm<PortfolioInput>({
    resolver: zodResolver(portfolioSchema),
    mode: "onChange",
    defaultValues: {
      projectPhoto: formData.projectPhoto || null,
      startTime: formData.startTime || "",
      endTime: formData.endTime || "",
      availableDays: formData.availableDays || [],
      availableTime: formData.availableTime || "",
    },
  });

  const { handleSubmit, trigger, getValues } = methods;

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = async (data: PortfolioInput) => {
    const allFormData = { ...formData, ...data };
    setFormData(allFormData);
    
    // TODO: Submit to API here
    console.log("Submitting profile:", allFormData);
    
    // Clear form data after successful submission
    clearFormData();
    
    navigation.navigate("BuilderProfileSuccess");
  };

  const handleComplete = async () => {
    const fields: (keyof PortfolioInput)[] = ["startTime", "endTime", "availableDays", "projectPhoto", "availableTime"];
    const valid = await trigger(fields);

    if (valid) {
      onSubmit(getValues());
    }
  };

  return (
    <KeyboardAvoidingLayout androidExtraPadding={40}>
      <FormProvider {...methods}>
        <View className="p-4 flex-1">
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={handleBack}>
              <Image
                source={arrowleft}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className="text-center font-interbold text-xl flex-1">
              Portfolio
            </Text>
            <View style={{ width: 25 }} />
          </View>

          <View className="pt-10 flex-1">
            <Portfolio />
          </View>

          <View className="pb-4 pt-6">
            <GradientButton title="Complete Setup" onPress={handleComplete} />
          </View>
        </View>
      </FormProvider>
    </KeyboardAvoidingLayout>
  );
}

