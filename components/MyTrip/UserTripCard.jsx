import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { formatDate } from "../../utils/formatDate";
import { useRouter } from "expo-router";

export default function UserTripCard({ trip }) {
  const formatData = (data) => JSON.parse(data);
  const router = useRouter(); 
  return (
    <TouchableOpacity
    onPress={() => router.push({pathname:'/trip-details',params:{
      trip:JSON.stringify(trip)
    }})}
      style={{
        marginTop: 15,
        display: "flex",
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
      }}
    >
      {/* <Image
        source={require("@/assets/images/people.jpg")}
        style={{ width: 100, height: 100, borderRadius: 13}}
      /> */}
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${formatData(trip?.tripData)?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{
          height: 100,
          width: 100,
          objectFit: "cover",
          borderRadius: 13,
        }}
      />
      <View>
        <Text className="text-white font-[outfit-medium] text-[18px] ">
          {trip?.tripPlan?.travelPlan?.destination}
        </Text>
        <Text className="text-gray-400 font-[outfit] text-[14px] ">
          {formatDate(formatData(trip?.tripData).startDate)}
        </Text>
        <Text className="text-gray-400 font-[outfit-medium] text-[14px] ">
          Travelling : {formatData(trip?.tripData).title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
