import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useTripStore from "../../store/tripStore";

export default function SearchPlace() {
  const navigation = useNavigation();
  const setTripData = useTripStore((state) => state.setTripData);
  const router = useRouter();

 
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.background,
        height: "100%",
      }}
    >
      <GooglePlacesAutocomplete
        placeholder="Search Place"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
        
          const locationInfo = {
            name: data?.description,
            coordinates: details?.geometry?.location,
            photoRef: details?.photos[0]?.photo_reference,
            url: details?.url,
          };
          setTripData(locationInfo);
          router.push("/create-trip/select-traveler");
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: "en",
        }}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 15,
            marginTop: 10,
            padding: 5,
          },
        }}
      />
      {/* <View className="flex flex-row justify-between">
        <TouchableOpacity onPress={() => handleData()} className="">
          <Text className="text-white">Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/create-trip/select-traveler")} >
          <Text className="text-white">Next</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
