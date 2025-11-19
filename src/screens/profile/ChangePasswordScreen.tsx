import React from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthHeader from "@/src/components/Miscallaneous/PageHeader";
import PasswordInput from "@/src/components/Forms/PasswordInput";
import GradientButton from "@/src/components/Buttons/GradientButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type ChangePasswordScreenProps = NativeStackScreenProps<RootStackParamList, "ChangePassword">;

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const ChangePasswordScreen = ({ navigation }: ChangePasswordScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordForm) => {
    // TODO: Implement password change API call
    Alert.alert("Success", "Password changed successfully", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View className="flex-1 bg-white">
        <AuthHeader title="Change Password" onBackPress={handleBack} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="px-4 pt-6">
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="Current Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your current password"
                  hasError={!!errors.currentPassword}
                />
              )}
            />
            {errors.currentPassword && (
              <Text className="text-red-500 text-sm mt-1 font-inter">
                {errors.currentPassword.message}
              </Text>
            )}

            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="New Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your new password"
                  hasError={!!errors.newPassword}
                />
              )}
            />
            {errors.newPassword && (
              <Text className="text-red-500 text-sm mt-1 font-inter">
                {errors.newPassword.message}
              </Text>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  label="Confirm New Password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirm your new password"
                  hasError={!!errors.confirmPassword}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 text-sm mt-1 font-inter">
                {errors.confirmPassword.message}
              </Text>
            )}

            {/* Action Buttons */}
            <View className="mt-8 gap-4">
              <GradientButton
                title="Update Password"
                onPress={handleSubmit(onSubmit)}
              />
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-white border-2 border-gray-300 rounded-full py-4 items-center"
              >
                <Text className="text-gray-700 font-interbold text-base">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

