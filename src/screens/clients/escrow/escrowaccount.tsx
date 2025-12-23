import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlueEscowBackground } from '@/src/constants/image'
import AppLayout from '@/src/components/Layouts/AppLayout'
import QuickAccessCard from '@/src/components/PagesComponent/Dashboard/Shared/QuickAccessCard'

import { PlusIcon, SupportIcon } from '@/src/constants/icon'

const EscrowAccount = ({ navigation }: any) => {

      const handleDocument = () => {

    navigation.navigate("EscrowAccount"); 
  };

  const handleSupport = () => {
   
    navigation.navigate("Support"); // Make sure this screen exists
  };
  return (
    <AppLayout screenName='Escrow Account'>
      <View className="px-4 pt-4">
        <View className="relative rounded-2xl overflow-hidden">
          {/* Background Image */}
          <Image 
            resizeMode="cover" 
            className="absolute w-full h-full"
            source={BlueEscowBackground} 
          />
          
          {/* Content Overlay */}
          <View className="p-5 pb-6">
            {/* Header Section */}
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <Text className="text-white/80 text-sm mb-1">
                  My Wallet Balance | <Text className="font-semibold">2041467890</Text>
                </Text>
                <Text className="text-white text-base font-semibold tracking-wide">
                  ONABANJO ADEBOLANLE
                </Text>
              </View>
              <TouchableOpacity className="bg-white/20 p-2 rounded-lg">
                <Text className="text-white text-lg">📋</Text>
              </TouchableOpacity>
            </View>

            {/* Balance Section */}
            <View className="flex-row items-center mb-1">
              <Text className="text-white text-5xl font-bold mr-3">₦0.00</Text>
              <TouchableOpacity className="bg-white/20 p-2 rounded-full">
                <Text className="text-white">👁</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-white/70 text-xs mb-6">
              Managed by HomeBase Mortgage Bank
            </Text>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity className="bg-white rounded-full px-6 py-3 flex-row items-center flex-1">
                <Text className="mr-2">🎯</Text>
                <Text className="font-semibold text-gray-800">View project</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="bg-white/20 rounded-full px-6 py-3 flex-row items-center flex-1">
                <Text className="mr-2">🎁</Text>
                <Text className="font-semibold text-white">History & Receipts</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

        <View className="px-4 pt-4">
          <Text className="font-interbold text-xl mb-4 text-gray-900">
            Quick Access
          </Text>
          <View className="flex-row gap-4">
            <QuickAccessCard
              icon={PlusIcon}
              title="Document"
              onPress={handleDocument}
            />
           
            <QuickAccessCard
              icon={SupportIcon}
              title="Support"
              onPress={handleSupport}
            />
          </View>
        </View>
    </AppLayout>
  )
}

export default EscrowAccount