import { BathroomIcon, BedrooomIcon, LocationIcon, SquareMeter } from '@/src/constants/icon';
import { SampleImage } from '@/src/constants/image';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ClientPropertiesComponent() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View className="bg-gray-100 m-4 pt-4 justify-center">
      <View 
        className="bg-white p-2 rounded-3xl overflow-hidden shadow-lg"
        style={{ width: width - 32, maxWidth: 700 }}
      >
        <Image
          source={SampleImage}
          className="w-full rounded-xl"
          style={{ height: 200 }}
          resizeMode="cover"
        />
        
        <View className="absolute top-6 left-6 bg-gray-900 px-5 py-2.5 rounded-xl">
          <Text className="text-white font-inter text-base font-semibold tracking-wide">
            Duplex
          </Text>
        </View>
        
        <TouchableOpacity
          className="absolute top-5 right-6"
          onPress={() => setIsFavorite(!isFavorite)}
          activeOpacity={0.7}
        >
          <View 
            className={`w-12 h-12 rounded-full justify-center items-center shadow-md ${
              isFavorite ? 'bg-red-50' : 'bg-white/95'
            }`}
          >
            <Text className="text-3xl">
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </View>
        </TouchableOpacity>

        <View className="pt-4 p-2">
          <View className="flex-row justify-between ">
            <Text className="font-interbold text-xl flex-1" numberOfLines={1}>
              Modern 4BR Duplex
            </Text>
            <Text className="font-interbold text-xl ml-2">
              #56,000,000
            </Text>
          </View>

          <View className="flex-row gap-2 py-4 items-start">
            <Image 
              source={LocationIcon} 
              style={{ width: 15, height: 15, marginTop: 2 }} 
              resizeMode="contain" 
            />
            <Text className="font-inter flex-1" numberOfLines={2}>
              14, Banana Island V.I, beside Sunny Police Station Lagos, Nigeria
            </Text>
          </View>


          <View className="flex-row justify-between">
             <View
                      
                          className="bg-gray-200 gap-2 p-3 w-20 rounded-3xl  flex-row items-end "
                        >
                        <Image className="w-4 h-4" source={BedrooomIcon}/>
                          <Text className="text-xs font-inter">
                            5 beds
                          </Text>
                        </View>
                           <View
                      
                          className="bg-gray-200 gap-2 p-3 w-20 rounded-3xl  flex-row items-end "
                        >
                        <Image className="w-4 h-4" source={BathroomIcon}/>
                          <Text className="text-xs font-inter">
                            3 baths
                          </Text>
                        </View>
                           <View
                      
                          className="bg-gray-200 gap-2 p-3 w-22 rounded-3xl  flex-row items-end "
                        >
                        <Image className="w-4 h-4" source={SquareMeter}/>
                          <Text className="text-xs font-inter">
                            350 sqm
                          </Text>
                        </View>
          </View>
        </View>
      </View>
    </View>
  );
}