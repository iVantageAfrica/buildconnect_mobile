import { QuestionImage } from '@/src/constants/image'
import React from 'react'
import { View, Text, Image } from 'react-native'



const EmptyScreenComponent = () => {
  return (
   <View className="flex items-center justify-center py-20">
    <View className="py-4"> <Image style={{width:40, height:40}} source={QuestionImage} resizeMode='contain'/></View>
   
         <Text className="text-gray-500 font-inter text-base">
            No projects yet
         </Text>
       </View>
  )
}

export default EmptyScreenComponent