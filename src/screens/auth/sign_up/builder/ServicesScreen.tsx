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
import Services from "./components/Services";
import { useBuilderProfileStore } from "@/src/store/BuilderProfileStore";

type ServicesScreenProps = NativeStackScreenProps<RootStackParamList, "BuilderServices">;

const servicesSchema = z.object({
  services: z.array(z.string()).min(1, "Select at least one project type"),
});

type ServicesInput = z.infer<typeof servicesSchema>;

export default function ServicesScreen({ navigation }: ServicesScreenProps) {
  const { formData, setFormData } = useBuilderProfileStore();

  const methods = useForm<ServicesInput>({
    resolver: zodResolver(servicesSchema),
    mode: "onChange",
    defaultValues: {
      services: formData.services || [],
    },
  });

  const { handleSubmit, trigger, getValues } = methods;

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = async (data: ServicesInput) => {
    setFormData(data);
    navigation.navigate("BuilderPortfolio");
  };

  const handleContinue = async () => {
    const valid = await trigger("services");

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
              Services
            </Text>
            <View style={{ width: 25 }} />
          </View>

          <View className="pt-10 flex-1">
            <Services />
          </View>

          <View className="pb-4 pt-6">
            <GradientButton title="Continue" onPress={handleContinue} />
          </View>
        </View>
      </FormProvider>
    </KeyboardAvoidingLayout>
  );
}

