import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function StartNewTripCard() {
  const router = useRouter();
  // const setTrip = useTripStore((state) => state.addTripData);

  return (
    <View className="p-10 flex flex-col justify-center items-center">
      <Ionicons name="location-sharp" size={32} color={Colors.PRIMARY} />
      <Text className="font-[outfit-medium] text-lg mt-3 text-white">
        No trips planned yet
      </Text>
      <Text className="font-[outfit] text-md mt-1 text-base text-center text-gray-500">
        Looks like it's time to plan a new travel experience ! Get Started below
      </Text>
      <TouchableOpacity
        onPress={() => router.push("create-trip/search-place")}
        className="mt-5 bg-primary py-2 rounded-xl px-6 shadow-lg shadow-orange-800"
      >
        <Text className="font-[outfit-medium] text-[16px] text-white">
          Start a new trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
