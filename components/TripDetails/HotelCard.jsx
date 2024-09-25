import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "../../utils/GooglePlaceApi";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../../constants/Colors";
import MapModal from "../Modal/MapModal";

export default function HotelCard({ item }) {

  const [photoRef, setPhotoRef] = useState();
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(item?.name);

    if (result?.status === "OK" && result.results.length > 0) {
      const hotelData = result.results[0];
      const photo = hotelData.photos?.[0]?.photo_reference;

      if (photo) {
        setPhotoRef(photo);
      }
      setData(hotelData);
    }
  };

  const photoUrl = photoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
    : null;

    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

  return (
    <View className="mr-4 w-44 border border-black  shadow-xl shadow-dark  rounded-lg overflow-hidden">
      {photoUrl ? (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: 180, height: 110, borderRadius: 0 }}
        />
      ) : (
        <Image
          source={require("@/assets/images/people.jpg")}
          style={{ width: 180, height: 110, borderRadius: 0 }}
        />
      )}

      <View className="px-2 pt-1 flex flex-row justify-between items-center">
        <Text className="text-white font-[outfit] text-[12px] pt-1">
          {item?.name}
        </Text>
        <TouchableOpacity onPress={toggleModal}>
            <Feather name="map-pin" size={14} color={Colors.primary} />
          </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between px-2 pb-2">
        <Text className="text-white font-[outfit] text-[12px] pt-1">
          ⭐ {item?.rating}
        </Text>
        <Text className="text-white font-[outfit] text-[10px] pt-1">
          💰 {item?.price}
        </Text>
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
