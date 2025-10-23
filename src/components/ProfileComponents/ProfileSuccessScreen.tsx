import { View, Text } from 'react-native'
import React from 'react'
import SuccessScreen from '../SucessScreen'

const ProfileSuccessScreen = () => {
  return (
   <SuccessScreen
  title="You’re all set!"
  message="Congratulations! Your account has been created successfully."
  navigateTo="GetStarted"
 />
  )
}

export default ProfileSuccessScreen