import { View, Text } from 'react-native'
import React from 'react'

export default function TripCard({data,selectedTraveler}) {
  return (
    <View className={`${(selectedTraveler?.id === data?.id) ? "transition-shadow border border-orange-400" : "border border-orange-100" } p-4 flex flex-row justify-between  bg-gray-200 rounded-xl mb-5 shadow-lg shadow-gray-300`}>
      <View>
      <Text className={`${(selectedTraveler?.id === data?.id) ? "font-[outfit-bold] text-[18px] text-orange-500 transition-all" : "font-[outfit-medium] text-[17px]" }`}>{data?.title || data?.budgetTitle}</Text>
      <Text className="font-[outfit] text-[15px] text-gray-600">{data?.description || data?.budgetDescription}</Text>
      </View>
      <Text className="text-[26px]">{data.icon || data.budgetIcon}</Text>
    </View>
  )
}