import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  hasError?: boolean;
  width:string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  hasError = false,
  width='w-full'
}) => {
  return (
     <View className={`${width}`} >
      <Text className="font-inter  text-black mt-4  text-left">
        {label}
      </Text>
      <TextInput
        className={`h-[50px] font-inter w-full mt-3 px-2.5 text-base text-gray-600 rounded-[10px] border ${
          hasError ? 'border-red-500' : 'border-gray-300'
        }`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default FormInput;