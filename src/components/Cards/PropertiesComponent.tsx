import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons' 
import { SampleImage } from '@/src/constants/image'
import StatusBar from '../Miscallaneous/StatusBar'

const PropertiesComponent = () => {
  return (
    <View className="mx-4 bg-white rounded-3xl shadow-lg overflow-hidden">
  
      <View>
        <Image 
          className="w-full" 
          style={{width: '100%', height: 220}} 
          source={SampleImage} 
          resizeMode='cover'
        />
      </View>

  
      <View className="p-4">
     
        <View className="flex-row justify-between items-start mb-2">
          <Text className="font-interbold text-xl flex-1">Modern Townhouse</Text>
          <StatusBar title={"Available"}/>
        </View>

    
        <View className="mb-3">
          <Text className="text-gray-500 font-inter text-sm">
            123 Elim Street, Agungi Lekki Lagos
          </Text>
        </View>

    
        <View className="flex-row justify-between items-center">
          <Text className="font-interbold text-xl">
            ₦129,000,000
          </Text>
          <View className="flex-row gap-2">
            <TouchableOpacity className="p-2">
              <Ionicons name="eye-outline" size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <Ionicons name="create-outline" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PropertiesComponent