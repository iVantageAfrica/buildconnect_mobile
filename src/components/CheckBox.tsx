import Checkbox from 'expo-checkbox';
import { View, Text, Linking } from 'react-native';
import { useState } from 'react';

type TermsAgreementProps = {
  termsUrl?: string;
  privacyUrl?: string;
  checkedColor?: string;
  uncheckedColor?: string;
  className?: string;
  textClassName?: string;
  linkClassName?: string;
};

const TermsAgreement: React.FC<TermsAgreementProps> = ({
  termsUrl = 'https://example.com/terms',
  privacyUrl = 'https://example.com/privacy',
  checkedColor = '#ff6b6b',
  uncheckedColor = '#d1d5db',
  className = '',
  textClassName = '',
  linkClassName = '',
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View className={`flex-row items-start p-2 ${className}`}>
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? checkedColor : uncheckedColor}
      />
      
      <Text className={`flex-1 ml-3 font-inter text-sm text-gray-700 leading-5 ${textClassName}`}>
        By creating an account, you agree to our <Text 
          className={`text-blue-600 ${linkClassName}`}
          onPress={() => Linking.openURL(termsUrl)}
        >Terms of Service</Text> and <Text 
          className={`text-blue-600 ${linkClassName}`}
          onPress={() => Linking.openURL(privacyUrl)}
        >Privacy Policy of BuildConnect</Text>
      </Text>
    </View>
  );
};

export default TermsAgreement;