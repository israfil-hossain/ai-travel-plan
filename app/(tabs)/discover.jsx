import { ThemedText } from '@/components/ThemedText';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import useAuthStore from '../../store/auth-store';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewActivity from '../../components/Discover/StartNewActivity';

export default function Discover() {
  const router = useRouter(); 
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user  } = useAuthStore();
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
        Activity Feed
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
          <StartNewActivity />
        ) : (
          <Text> No Activity There </Text>
        )}
      </>
    )}
  </View>
  );
}


