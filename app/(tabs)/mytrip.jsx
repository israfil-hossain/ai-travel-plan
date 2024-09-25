import {
  StyleSheet,
  Platform,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Colors } from "./../../constants/Colors";
import StartNewTripCard from "../../components/MyTrip/StartNewTripCard";
import useAuthStore from "../../store/auth-store";
import { auth, db } from "../../configs/FirebaseConfig";
import { collection, query, getDocs, where } from "@firebase/firestore";
import UserTripList from "../../components/MyTrip/UserTripList";
import { useRouter } from "expo-router";


export default function Mytrip() {

  const router = useRouter(); 
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user  } = useAuthStore();

  const getUserTrips = async () => {
    try {
      setIsLoading(true);
      setUserTrips([])
      const q = query(
        collection(db, "UserTrips"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserTrips((prev) => [...prev, doc.data()]);
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    user && getUserTrips();
  }, [user]);

  console.log(userTrips);
  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.background,
        height: "100%",
      }}
    >
      <View className="flex flex-row justify-between items-center ">
        <ThemedText className="font-[outfit-bold] text-2xl text-white">
          My Trips
        </ThemedText>
        <TouchableOpacity  onPress={() => router.push("create-trip/search-place")}> 
          <Ionicons name="add-circle" size={32} color={Colors.PRIMARY} />
        </TouchableOpacity>
       
      </View>
      {isLoading ? (
        <View className="flex flex-col justify-center h-full">
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
        </View>
      ) : (
        <>
          {userTrips?.length === 0 ? (
            <StartNewTripCard />
          ) : (
            <UserTripList userTrips={userTrips} />
          )}
        </>
      )}
    </View>
  );
}

