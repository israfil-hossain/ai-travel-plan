import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import useTripStore from "../../store/tripStore";
import CalendarPicker from "react-native-calendar-picker";
import { differenceInDays, format, parse } from "date-fns";
import { useToast } from "react-native-toast-notifications";

export default function SelectCalender() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const toast = useToast(); 
  const router = useRouter();

  const addTripData = useTripStore((state) => state.addTripData);

  const OnDateSelectionContinue = () => {
  
    if (!startDate || !endDate) {
      toast.show("Please select Start and End Date 👋", {
        type: "danger",
        offset:30, 
        animationType: "zoom-in"
      });
      return;
    }
    const startDateT = parse(startDate, 'dd-MM-yy', new Date());
    const endDateT = parse(endDate, 'dd-MM-yy', new Date());
  
    // Calculate the difference in days
    const totalNoOfDays = differenceInDays(endDateT, startDateT);

    const dateInfo = {
      startDate : startDate, 
      endDate : endDate, 
      totalNoOfDays : totalNoOfDays + 1
    }
    addTripData(dateInfo)
   
    router.push("/create-trip/select-budget");
  };
  const onDateChange = (date, type) => {
    if (date) {
      const dateObject = new Date(date);
      if (!isNaN(dateObject)) {
        const formattedDate = format(dateObject, "dd-MM-yy");
        if (type === "START_DATE") {
          setStartDate(formattedDate);
        } else {
          setEndDate(formattedDate);
        }
      } else {
        console.error("Invalid Date");
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);


  return (
    <View
      style={{
        paddingTop: 75,
        backgroundColor: Colors.background,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: "outfit-bold",
          marginTop: 20,
          color: Colors.text,
          padding: 20,
        }}
      >
        Travel Dates
      </Text>

      <View className="w-full mt-4 mx-1 p-10 ">
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={7}
          selectedRangeStyle={{
            backgroundColor: Colors.primary,
          }}
          selectedDayTextStyle={{
            color: Colors.tint,
          }}
          nextTitleStyle={{
            backgroundColor: Colors.secondary,
            padding: 5,
            borderRadius: 5,
            color: Colors.tint,
          }}
          monthTitleStyle={{
            color: Colors.tint,
          }}
          yearTitleStyle={{
            color: Colors.tint,
          }}
          previousTitleStyle={{
            backgroundColor: Colors.secondary,
            padding: 5,
            borderRadius: 5,
            color: Colors.tint,
          }}
          textStyle={{
            color: Colors.tertiary,
          }}
          headerWrapperStyle={{
            color: Colors.tint,
          }}
          dayLabelsWrapper={{
            color: Colors.tint,
          }}
          style={{ color: Colors.tint, width: 10 }}
        />
      </View>
      <View className="px-10 pt-5">
        <TouchableOpacity
          className="py-2 px-5 bg-primary rounded-lg text-center items-center"
          onPress={() => OnDateSelectionContinue()}
        >
          <Text className="text-center text-white font-[outfit-medium] text-[16px]">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
