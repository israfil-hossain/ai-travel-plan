import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function FlightInfo({ flightData }) {
  return (
    <View className="mt-5 border border-black  shadow-inner shadow-gray-100  p-3 rounded-md ">
      <View className="flex flex-row justify-between">
      <Text className="font-[outfit-bold] text-[18px] text-white">
        Flights {"  "} ✈️{" "}
      </Text>
      <TouchableOpacity className="bg-primary w-24 p-1.5  rounded-lg items-center ">
        <Text className="text-white text-center font-[outfit] text-[15px]">
          Book Here
        </Text>
      </TouchableOpacity>
      </View>
      <View className="flex flex-row space-x-2 ">
        <Text className="font-[outfit] text-gray-300   text-[15px]">
          Airline :{" "}
        </Text>
        <Text className="font-[outfit] text-gray-300   text-[15px]">
          {" "}
          Delta{" "}
        </Text>
      </View>
      <View className="flex flex-row space-x-2 ">
        <Text className="font-[outfit] text-gray-300  pt-2 text-[15px]">
          Price :{"   "}
        </Text>
        <Text className="font-[outfit] text-gray-300  pt-2 text-[14px] mr-4  pr-5">
          {" "}
          {flightData?.price}
        </Text>
      </View>

      
    </View>
  );
}
