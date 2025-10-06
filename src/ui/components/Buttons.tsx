import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colors from '../../constants/colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
  active?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style = {},
  textStyle = {},
  disabled = false,
  active = false,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: active ? colors.primary_color : "#ffffff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        ...style,
      }}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={{
        color:  active ? '#fff' : colors.primary_color,
        fontWeight: 'bold',
        fontSize: 16,
        ...textStyle,
      }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;