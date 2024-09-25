import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import TripCard from "../../components/CreateTrip/TripCard";
import useTripStore from "../../store/tripStore";
import { useToast } from "react-native-toast-notifications";
import { BudgetList } from "../../constants/BudgetList";

export default function SelectBudget() {
  const navigation = useNavigation();
  const [selectedBudget, setSelectedBudget] = useState();
  const addTripData = useTripStore((state) => state.addTripData);
  const toast = useToast();
  const router = useRouter(); 

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const handleClick = () => {
    if (!selectedBudget) {
      toast.show("Please select Budget 👋", {
        type: "danger",
        offset: 30,
        animationType: "zoom-in",
      });
      return;
    } else {
      const budget = {
        budgetTitle : selectedBudget?.budgetTitle
      }
      addTripData(budget);
      router.push("/create-trip/review-trip");
    }
  };

  return (
    <View
      style={{
        padding: 25,
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
          color: Colors.tint,
        }}
      >
        Budget
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 16,
            marginBottom: 20,
            color: Colors.secondary,
          }}
        >
          Chosse your spending habits for your trip{" "}
        </Text>

        <FlatList
          data={BudgetList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              key={index}
              onPress={() => setSelectedBudget(item)}
            >
              <TripCard data={item} selectedTraveler={selectedBudget} />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleClick()}
        className="py-3 px-5 bg-primary rounded-lg text-center items-center mt-5"
      >
        <Text className="text-center text-white font-[outfit-medium] text-[16px]">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
