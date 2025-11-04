import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native'; 

interface FormDatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  hasError?: boolean;
  errorMessage?: string;
  width?: string;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  value,
  onChange,
  hasError = false,
  errorMessage,
  width = "w-full",
}) => {
  const [show, setShow] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View className={width}>
      <Text className="text-base font-inter text-gray-900 mb-3">
        {label}
      </Text>
      
      <TouchableOpacity
        onPress={() => setShow(true)}
        className={`flex-row items-center justify-between px-4 py-3 bg-white rounded-xl ${
          hasError ? 'border-2 border-red-500' : 'border border-gray-300'
        }`}
      >
        <Text className="text-base font-inter text-gray-900">
          {formatDate(value)}
        </Text>
        <Calendar size={20} color="#6b7280" />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      {hasError && errorMessage && (
        <Text className="text-red-500 font-inter text-sm mt-1">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};