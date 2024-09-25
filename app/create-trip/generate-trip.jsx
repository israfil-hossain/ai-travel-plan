import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import useTripStore from "../../store/tripStore";
import useAuthStore from "../../store/auth-store";
import useLanguageStore from "../../store/language-store";
import { Ai_Prompt } from "../../constants/Aiprompt";
import { chatSession } from "../../configs/AiModel";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function GenerateTrip() {
  const navigation = useNavigation();
  const tripData = useTripStore((state) => state.tripData || {});
  const reset = useTripStore((state) => state.reset);
  const user = useAuthStore((state) => state.user);
  const language = useLanguageStore((state) => state.language);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const GenerateAiTrip = async () => {
    setIsLoading(true);
    try {
      const Final_Prompt = Ai_Prompt
        .replace("{location}", tripData?.name)
        .replace("{totalDays}", tripData?.totalNoOfDays)
        .replace("{totalNight}", tripData?.totalNoOfDays - 1)
        .replace("{forDay}",tripData?.totalNoOfDays)
        .replace("{forNight}", tripData?.totalNoOfDays - 1)
        .replace("{traveler}", tripData?.title)
        .replace("{budget}", tripData?.budgetTitle)
        .replace("{language}", language);

        console.log("Prompt : ", Final_Prompt); 
  
      const result = await chatSession.sendMessage(Final_Prompt);
      const tripResponse = JSON.parse(result.response.text());
      const docId = Date.now().toString();
  
      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user?.email,
        tripPlan: tripResponse,
        tripData: JSON.stringify(tripData),
      });
  
      router.push("(tabs)/mytrip");
    } catch (err) {
      console.error("Trip generation error: ", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    GenerateAiTrip();
  }, []);

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
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.background,
        height: "100%",
      }}
    >
      {isLoading ? (
        <>
          <Text
            style={{
              fontSize: 35,
              fontFamily: "outfit-bold",
              marginTop: 20,
              color: Colors.tint,
            }}
          >
            Please Wait
          </Text>
          <Text className="text-gray-400 text-[17px] mt-4 font-[outfit]">
            We are working to generate your dream trip
          </Text>
          <View className="mt-24 flex flex-col justify-center items-center w-[100%] ">
            <Image
              source={require("./../../assets/images/Loadergif.gif")}
              style={{ width: 100, height: 100, borderRadius: 20 }}
            />
          </View>
          <Text className="text-tertiary font-[outfit-medium] text-[14px] text-center mt-8">
            Do not Go Back
          </Text>
        </>
      ) : (
        <>
          <View className="flex flex-col jsutify-center items-center">
            <Text className="text-white font-[outfit-bold] text-center text-[20px] ">
              No Data Found !
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
