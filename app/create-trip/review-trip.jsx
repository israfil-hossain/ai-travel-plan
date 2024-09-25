import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import useTripStore from "../../store/tripStore";
import { format, parse } from "date-fns";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const tripData = useTripStore((state) => state.tripData || {});
  const router = useRouter();

  const startDate = parse(tripData?.startDate, "dd-MM-yyy", new Date());
  const endDate = parse(tripData?.endDate, "dd-MM-yyyy", new Date());
  const formatStartDate = format(startDate, "dd MMM");
  const formatEndDate = format(endDate, "dd MMM yy");

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const handleClick = () => {
    router.push("/create-trip/generate-trip");
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.background,
        height: "100%",
      }}
    >
      <View className="flex flex-row space-x-4 justify-start items-center ">
        <Text
          style={{
            fontSize: 35,
            fontFamily: "outfit-bold",
            marginTop: 20,
            color: Colors.tint,
          }}
        >
          Review Your Trip
        </Text>
        <Text className="text-[20px]">✈️</Text>
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 16,
            marginBottom: 20,
            color: Colors.secondary,
          }}
        >
          Before generating your trip, please review your selection
        </Text>
        <View className="mt-8 flex flex-row space-x-2 justify-start items-center">
          <Text className="text-[20px] px-2">📍</Text>
          <View>
            <Text className="font-[outfit] text-gray-500 ">Destination</Text>
            <Text className="font-[outfit] text-white py-1">
              {tripData?.name}
            </Text>
          </View>
        </View>

        {/* Date  */}
        <View className="mt-6 flex flex-row space-x-2 justify-start items-center">
          <Text className="text-[20px] px-2">📆</Text>
          <View>
            <Text className="font-[outfit] text-gray-500 ">Travel Date</Text>
            <Text className="font-[outfit] text-white py-1">
              {formatStartDate} {"To"} {formatEndDate} {" "} {"("} {tripData?.totalNoOfDays}{" "}
              {tripData?.totalNoOfDays < 2 ? " Day " : " Days "}{" )"}
            </Text>
          </View>
        </View>

        {/* Travelers Info  */}
        <View className="mt-6 flex flex-row space-x-2 justify-start items-center">
          <Text className="text-[20px] px-2">🚎</Text>
          <View>
            <Text className="font-[outfit] text-gray-500 ">
              Who is Travelling
            </Text>
            <Text className="font-[outfit] text-white py-1">
              {tripData?.title}
            </Text>
          </View>
        </View>

        {/* Budget  */}
        <View className="mt-6 flex flex-row space-x-2 justify-start items-center">
          <Text className="text-[20px] px-2">💰</Text>
          <View>
            <Text className="font-[outfit] text-gray-500 ">Budget</Text>
            <Text className="font-[outfit] text-white py-1">
              {tripData?.budgetTitle}
            </Text>
          </View>
        </View>
      </View>

      <View className="w-[100%] flex flex-row justify-center items-center mt-5">
        <TouchableOpacity
          onPress={() => handleClick()}
          className="py-3 px-5 bg-primary rounded-lg text-center items-center mt-20 w-[85%]"
        >
          <Text className="text-center text-white font-[outfit-medium] text-[16px]">
            ✨ Build my Trip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
