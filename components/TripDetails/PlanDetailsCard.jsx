import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { GetPhotoRef } from "../../utils/GooglePlaceApi";
import Feather from "@expo/vector-icons/Feather";
import MapModal from "../Modal/MapModal";

export default function PlanDetailsCard({ item, activityItem }) {
  const [photoRef, setPhotoRef] = useState();
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    try {
      const result = await GetPhotoRef(item?.name);
      console.log("reeee", result);

      if (result?.status === "OK" && result.results.length > 0) {
        const hotelData = result.results[0];
        const photo = hotelData.photos?.[0]?.photo_reference;

        if (photo) {
          setPhotoRef(photo);
        }
        setData(hotelData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const photoUrl = photoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
    : null;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      {photoUrl ? (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: "100%", height: 130, borderRadius: 0 }}
        />
      ) : (
        <Image
          source={require("@/assets/images/people.jpg")}
          style={{ width: "100%", height: 130, borderRadius: 0 }}
        />
      )}

      <View className="p-4">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-secondary py-1 font-[outfit-medium] ">
            Time: {activityItem?.time}
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Feather name="map-pin" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <Text className="font-[outfit-medium] text-[12px] text-gray-400">
          🏝️ Place{" "}
        </Text>
        <Text className="font-[outfit-bold] text-[14px] text-gray-300 ml-4">
          {item?.name}
        </Text>
        
        <Text className="font-[outfit-medium] text-[12px] text-gray-400 pt-2">
          ℹ️ Information
        </Text>
        <Text className="font-[outfit] text-[13px] text-gray-300 ml-4">
          {item?.details}
        </Text>
        {item?.timeToTravel && (
          <>
            <Text className="font-[outfit-medium] text-[12px] text-gray-400 pt-2">
              ⌚ Time To Travel{" "}
            </Text>
            <Text className="font-[outfit] text-[14px] text-gray-300 ml-4">
              {item?.timeToTravel}
            </Text>
          </>
        )}

        <Text className="font-[outfit-medium] text-[12px] text-gray-300 pt-2">
          💡 Suggesstion{" "}
        </Text>
        <Text className="font-[outfit] text-[12px] pt-1 text-gray-300 ml-4">
          {activityItem?.bestTimeToVisit}
        </Text>
        {data && (
          <View style={{ marginTop: 12 }} className="flex flex-row justify-between items-center ">
            <Text className="font-[outfit-medium] text-[12px] text-gray-400">
              ⭐ Rating: {data.rating}
            </Text>
            <Text className="font-[outfit-medium] text-[12px] text-gray-400">
              👥 Total Ratings: {data.user_ratings_total}
            </Text>
          </View>
        )}
      </View>

      <MapModal
        visible={modalVisible}
        onClose={toggleModal}
        location={data?.geometry?.location}
        placeName={data?.name}
        address={data?.formatted_address}
      />
    </View>
  );
}
