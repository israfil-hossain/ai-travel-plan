import { View, Text, FlatList, Image } from "react-native";
import React, { useMemo } from "react";
import { Colors } from "../../constants/Colors";
import PlanDetailsCard from "./PlanDetailsCard";

const groupActivitiesByDay = (data) => {
  return data?.reduce((acc, curr) => {
    const { day } = curr;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(curr);
    return acc;
  }, {});
};

export default function PlannedTrip({ details }) {
  //   console.log("Details : ", details);

  const groupedActivities = useMemo(
    () => groupActivitiesByDay(details),
    [details]
  );

  console.log("Group Activities : ", groupedActivities);

  return (
    <View className="mt-5">
      <Text className="text-white font-[outfit-bold] text-[18px] mb-2">
        🏕️ {"  "}Plan Details
      </Text>
      {Object.keys(groupedActivities).map((day, index) => (
        <View key={index} style={{ marginBottom: 10, marginTop: 12 }}>
          <View className="flex flex-row items-center space-x-2 mb-4">
            <Text className="font-[outfit-bold] text-orange-500 text-[12px] ">
              🟠
            </Text>
            <Text className="font-[outfit-bold] text-white text-[18px] ">
              Day {day}
            </Text>
          </View>
          {/* List activities for each time period */}
          {groupedActivities[day]?.map((activityItem, activityIndex) => (
            <View
              key={activityIndex}
              className="border border-black   mb-6 rounded-xl overflow-hidden"
              style={{
                shadowColor: Colors.background,
                shadowOffset: { width: 1, height: 2 }, // The offset of the shadow
                shadowOpacity: 0.25, // Opacity of the shadow
                shadowRadius: 3.84, // How blurry the shadow is
                elevation: 9,
              }}
            >
              {activityItem?.activities?.map((item, index) => (
                <PlanDetailsCard item={item} activityItem={activityItem} key={index} />
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
