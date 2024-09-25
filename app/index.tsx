import { View } from "react-native";
import React, { useEffect } from "react";
import Login from "./../components/Login";
import { auth } from "./../configs/FirebaseConfig";
import { Redirect } from "expo-router";
import useAuthStore from '../store/auth-store'; 

export default function Index() {
  const { user, loadUser  } = useAuthStore();

  useEffect(() => {
    loadUser(); // Load user data from AsyncStorage
  }, []);


  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href={'/(tabs)/mytrip'} /> : <Login />}
    </View>
  );
}
