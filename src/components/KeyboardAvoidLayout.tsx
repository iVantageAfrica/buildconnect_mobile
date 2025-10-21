import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ViewStyle,
} from "react-native";

type KeyboardAvoidingLayoutProps = {
  children: ReactNode;
  keyboardVerticalOffset?: number;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: ViewStyle;
  className?: string;
};

const KeyboardAvoidingLayout: React.FC<KeyboardAvoidingLayoutProps> = ({
  children,
  keyboardVerticalOffset = 0,
  scrollEnabled = true,
  showsVerticalScrollIndicator = false,
  contentContainerStyle,
  className = "flex-1",
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={className}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1, paddingBottom: 60 },
          contentContainerStyle
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        scrollEnabled={scrollEnabled}
        bounces={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingLayout;