import { View, Text } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import PieChart from "react-native-pie-chart";

export default function CircularChart() {
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
  const widthAndHeight = 150;
  return (
    <View>
      <Text>CircularChart</Text>
      <View>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          CoverFill={"#000"}
        />
      </View>
    </View>
  );
}
