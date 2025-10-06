import { StyleSheet, View, Text } from "react-native";
import React from "react";
import
colors
  from "../constants/colors";

export default function AppHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: any;
}) {
  return (
    <View>
      <Text
        style={{ fontWeight: "800", fontSize: 16, color: colors.text_title }}
      > {title}</Text>
      {subtitle && (
        <Text
          style={{ fontWeight: "600", fontSize: 12, color: colors.text_body }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    marginVertical: 5,
  },
});
