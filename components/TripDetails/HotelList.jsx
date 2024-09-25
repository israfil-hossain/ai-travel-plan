import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "../../utils/GooglePlaceApi";
import HotelCard from "./HotelCard";

const HotelList = ({ hotelData }) => {
    console.log("hotel Data : ", hotelData); 
    
  return (
    <View className="mt-5">
      <Text className="font-[outfit-bold] text-[18px] text-white">
        🏨 {"  "}Hotel Recommendation
      </Text>
      <FlatList
        data={hotelData}
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 10}}
        renderItem={({ item, index }) => (
          <HotelCard item={item} key={index} />
        )}
      />
    </View>
  );
};

export default HotelList;
