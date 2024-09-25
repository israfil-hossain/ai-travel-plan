import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import UserTripCard from "./UserTripCard";
import ParallaxScrollView from "../ParallaxScrollView";
import { useRouter } from "expo-router";
import { formatDate } from "../../utils/formatDate";

export default function UserTripList({ userTrips }) {
  const LatestTrip = JSON.parse(userTrips[0].tripData);
  const router = useRouter(); 

  return (
    userTrips && (
      <ParallaxScrollView>
        <View>
          <View className="">
            {LatestTrip?.photoRef ? (
              <Image source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
              }} 
              style={{
                height: 240,
                width: "100%",
                objectFit: "cover",
                borderRadius: 15,
              }}/>
            ) : (
              <Image
                source={require("@/assets/images/people.jpg")}
                style={{
                  height: 240,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 15,
                }}
              />
            )}
          </View>
          <View className="mt-10">
            <Text className="text-white font-[outfit-medium] text-[18px] ">
              {userTrips[0]?.tripPlan?.travelPlan?.destination}
            </Text>
            <View className="flex flex-row justify-between items-center space-x-4 pt-1">
              <Text className="text-gray-500 text-[16px] font-[outfit]">
                {formatDate(LatestTrip?.startDate)}
              </Text>
              <Text className="text-gray-400 text-[16px] font-[outfit]">
                🚌 {LatestTrip?.title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push({pathname:'/trip-details',params:{
                trip:JSON.stringify(userTrips[0])
              }})}
              className="bg-primary rounded-lg p-3 mt-6"
            >
              <Text className="text-white font-[outfit-medium] text-center text-[16px]">
                See your plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {userTrips?.map((trip, index) => (
          <View>
            <UserTripCard trip={trip} />
          </View>
        ))}
      </ParallaxScrollView>
    )
  );
}
