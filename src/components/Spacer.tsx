import { View , ViewStyle} from "react-native"
import React from "react";

type SpacerProps = {
  width?:  ViewStyle["width"];
  height?:  ViewStyle["width"];
}

const Spacer = ({ width = "100%", height = 40 }: SpacerProps) => {
  return <View style={{ width, height }} />;
};


export default Spacer