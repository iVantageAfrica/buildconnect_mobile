import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import KeyboardAvoidingLayout from "@/src/components/Layouts/KeyboardAvoidLayout";
import SuccessScreen from "@/src/components/Notifications/SucessScreen";

type ProfileSuccessScreenProps = NativeStackScreenProps<RootStackParamList, "BuilderProfileSuccess">;

export default function ProfileSuccessScreen({ navigation }: ProfileSuccessScreenProps) {
  return (
    <KeyboardAvoidingLayout androidExtraPadding={40}>
      <View className="flex-1">
        <SuccessScreen
          title="You're all set!"
          message="Congratulations! Your account has been created successfully."
          navigateTo="Dashboard"
        />
      </View>
    </KeyboardAvoidingLayout>
  );
}
