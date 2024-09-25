import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Feather from '@expo/vector-icons/Feather';
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function StartNewActivity() {
  const router = useRouter();
  // const setTrip = useTripStore((state) => state.addTripData);

  return (
    <View className="p-10 flex flex-col justify-center items-center">
      <Feather name="activity" size={32} color={Colors.PRIMARY} />
      <Text className="font-[outfit-medium] text-lg mt-3 text-white">
        No Activity Here
      </Text>
      <Text className="font-[outfit] text-md mt-1 text-base text-center text-gray-500">
        Look Like You have travel experience ! Get Share Your Experience 
      </Text>
      <TouchableOpacity
        onPress={() => router.push("create-trip/search-place")}
        className="mt-5 bg-primary py-2 rounded-xl px-6 shadow-lg shadow-orange-800"
      >
        <Text className="font-[outfit-medium] text-[16px] text-white">
          Create Activity
        </Text>
      </TouchableOpacity>
    </View>
  );
}
