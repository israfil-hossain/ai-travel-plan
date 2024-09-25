import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View style={{backgroundColor: Colors.background}}>
      <Image
        source={require("./../assets/images/banner.jpg")}
        style={{
          width: "100%",
          height: 450,
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            textAlign: "center",
            padding: 5,
            marginTop: 5,
            color: Colors.PRIMARY
          }}
        >
          AI Travel Planner
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit",
            fontSize: 20,
          }}
          className="text-gray-400"
        >
          "Discover your next adventure effortlessly. Personalized itineraries
          at your fingertips. Travel smarter with AI-driven insights."
        </Text>
        <TouchableOpacity style={styles.button} 
        onPress={()=> router.push('auth/sign-in')}>
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 20,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 20,
    height: "100%",
    padding: 25,
  },
  button: {
    padding: 13,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: "20%",
    display: "flex",
    justifyContent: "center",
  },
});
