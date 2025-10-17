
import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type ButtonProps = {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle;      
    textStyle?: TextStyle; 
};

const PrimaryButton: React.FC<ButtonProps> = ({
    title,
    onPress,
    backgroundColor = "#007AFF", 
    textColor = "#FFFFFF",        
    style,
    textStyle,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, style]}
            onPress={onPress}
            activeOpacity={0.7}>
            <Text style={[styles.text, { color: textColor }, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 26,
    height: 50,
    margin: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});


export default PrimaryButton;