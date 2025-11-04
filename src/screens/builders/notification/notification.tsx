import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { arrowleft, SettingsIcon } from '@/src/constants/icon'
import Search from '@/src/components/Forms/Search'
import AppLayout from '@/src/components/Layouts/AppLayout'
import NotificationBox from '@/src/components/Miscallaneous/NotificationBox'




const NotificationScreen = () => {

  return (
  <AppLayout screenName="Notification">
    <View className="flex-row pt-5 gap-2 px-2">
          <View className="">
            <Search />
          </View>
          <TouchableOpacity>
            <Image source={SettingsIcon} className="w-14 h-14" />
          </TouchableOpacity>
        </View>

       <View>
        <NotificationBox/>
           <NotificationBox/>
       </View>
     
  </AppLayout>
    
    
     
  )
}

export default NotificationScreen