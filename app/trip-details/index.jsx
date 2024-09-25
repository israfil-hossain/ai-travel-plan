import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import { formatDate } from "../../utils/formatDate";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";

const TripDetails = () => {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();

  const [tripDetails, setTripDetails] = useState(null); // Initialize with null
  const [tripData, setTripData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const parseTrip = (data) => {
    try {
      return typeof data === "string" ? JSON.parse(data) : data;
    } catch (error) {
      console.error("Error parsing trip data:", error);
      return null; // Return null if parsing fails
    }
  };

  useEffect(() => {
    setIsLoading(true);
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: "#ff6347",
    });

    if (trip) {
      const parsedTrip = parseTrip(trip);
      setTripDetails(parsedTrip);
    }

    setIsLoading(false);
  }, [navigation, trip]);

  useEffect(() => {
    getTripData(tripDetails?.tripData);
  }, [tripDetails?.tripData]);

  const getTripData = async (tripDetails) => {
    try {
      setIsLoading(true);
      if (tripDetails) {
        const parsedTrip = parseTrip(tripDetails);
        setTripData(parsedTrip);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="">
      {isLoading ? (
        <View className="flex flex-col justify-center h-full">
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
        </View>
      ) : (
        <ScrollView>
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${tripData.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            style={{
              height: 330,
              width: "100%",
            }}
          />

          <View className="pt-6 px-4 bg-[#151718] h-[100%] rounded-t-3xl -mt-10 ">
            <Text className="text-white font-[outfit-bold] text-[20px] ">
              {tripData?.name}
            </Text>
            <View className="flex flex-row ">
              <Text className="text-gray-400 font-[outfit] text-[18px]">
                {formatDate(tripData?.startDate || null)} {" to "}
              </Text>
              <Text className="text-gray-400 font-[outfit] text-[18px]">
                {formatDate(tripData?.endDate || null)}
              </Text>
            </View>
            <Text className="text-gray-400 font-[outfit]">
              🚌 {tripData?.title}
            </Text>
            <FlightInfo
              flightData={tripDetails?.tripPlan?.travelPlan?.flight}
            />
            <HotelList hotelData={tripDetails?.tripPlan?.travelPlan?.hotels} />
            <PlannedTrip
              details={tripDetails?.tripPlan?.travelPlan?.dailyPlan || []}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TripDetails;
