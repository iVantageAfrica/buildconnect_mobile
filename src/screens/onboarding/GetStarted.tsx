import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { GetStartedImage } from '@/src/constants/image'
import PrimaryButton from '@/src/components/Button'

const GetStarted = () => {
    const [selectedRole, setSelectedRole] = useState<string>('builder');

  return (
    <View>
      <ImageBackground className="h-full w-full" source={GetStartedImage}>
       <View className="flex-col justify-end h-full items-center pb-[50px] px-11">
      <Text className="text-white font-work-sans-semibold text-4xl font-bold  text-center px-5">
        Get quality projects, showcase, grow your work
      </Text>

      <View className="flex-row bg-white/20 rounded-full p-1 w-full max-w-md mt-8">
        <TouchableOpacity
          className={`flex-1 py-3.5 px-5 items-center justify-center rounded-full ${
            selectedRole === 'client' ? 'bg-white' : ''
          }`}
          onPress={() => setSelectedRole('client')}
        >
          <Text className={`text-base font-medium ${
            selectedRole === 'client' ? 'text-gray-800' : 'text-white/70'
          }`}>
            I'm a Clients
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3.5 px-5 items-center justify-center rounded-full ${
            selectedRole === 'builder' ? 'bg-white' : ''
          }`}
          onPress={() => setSelectedRole('builder')}
        >
          <Text className={`text-base font-medium ${
            selectedRole === 'builder' ? 'text-gray-800' : 'text-white/70'
          }`}>
            I'm a Builder
          </Text>
        </TouchableOpacity>
      </View>
  
      <PrimaryButton textColor='white'  title='Create account'/>

      <Text className="text-gray-200 mt-2">Already have an account <Text className="font-bold">Login</Text></Text>
   
       </View>
      </ImageBackground>
    </View>
  )
}

export default GetStarted