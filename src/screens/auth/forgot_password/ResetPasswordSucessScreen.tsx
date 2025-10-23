import { View, Text } from 'react-native'
import React from 'react'
import SuccessScreen from '@/src/components/SucessScreen'

const ResetPasswordSucessScreen = () => {
  return (
      <SuccessScreen
  title="Password Reset Successfully!"
  message="Congratulations! Your Password Reset Is Successful. Log In With Your New Password And Continue Your Journey."
  navigateTo="SignIn"
  buttonTitle="Login"
 />
  )
}

export default ResetPasswordSucessScreen