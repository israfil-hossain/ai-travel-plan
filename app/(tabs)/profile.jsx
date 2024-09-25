import {
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { auth } from "../../configs/FirebaseConfig";
import useAuthStore from "../../store/auth-store";
import { useNavigation, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect } from "react";

export default function Profile() {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      logout();
      router.replace("auth/sign-in"); // Navigate back to the sign-in screen
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };
  return (
    <ParallaxScrollView>
      <View className="pt-8 px-9">
        <Text className="text-white font-[outfit-medium] text-[18px] text-center ">
          ⚙️  Profile Settings
        </Text>

        {/* User Section  */}
        <View className="flex flex-row mt-6 items-center space-x-3  border-b border-gray-800 pb-5 mb-4">
          <View className="border border-primary rounded-full p-2 ">
            <AntDesign name="user" size={22} color={Colors.PRIMARY} />
          </View>

          <View>
            <Text className="font-[outfit-bold] text-[18px] text-gray-200">
              Israfil Hossain{" "}
            </Text>
            <Text className="font-[outfit] text-[15px] text-gray-400">
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Personal Info Section  */}
        <Text className="font-[outfit] text-[14px] text-secondary mb-3">
          {" "}
          Personal Info{" "}
        </Text>

        <TouchableOpacity className="flex flex-row justify-between mb-3 border rounded-xl  blur-md " activeOpacity={0.4}>
          <View className="flex flex-row space-x-3 items-center">
            <AntDesign name="user" size={20} color={Colors.GRAY} />
            <Text className="font-[outfit-medium] text-[16px] text-grey">
              {" "}
              Profile
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row justify-between mb-3 border rounded-xl  blur-md " activeOpacity={0.4}>
          <View className="flex flex-row space-x-3 items-center">
            <FontAwesome6 name="money-bills" size={17} color={Colors.GRAY} />
            <Text className="font-[outfit-medium] text-[16px] text-grey">
              {" "}
              My Expense
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>

        {/* General Section  */}
        <Text className="font-[outfit] text-[14px] text-secondary mb-3 mt-3">
          {" "}
          General
        </Text>
        <TouchableOpacity className="flex flex-row justify-between mb-3 border rounded-xl  blur-md " activeOpacity={0.4}>
          <View className="flex flex-row space-x-3 items-center">
            <MaterialIcons name="notifications" size={20} color={Colors.GRAY} />
            <Text className="font-[outfit-medium] text-[16px] text-grey">
              {" "}
              Notifications
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row justify-between mb-3 border rounded-xl  blur-md " activeOpacity={0.4}>
          <View className="flex flex-row space-x-3 items-center">
            <MaterialIcons name="language" size={20} color={Colors.GRAY} />
            <Text className="font-[outfit-medium] text-[16px] text-grey">
              {" "}
              Language
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>

        {/* Security Section  */}
        <Text className="font-[outfit] text-[14px] text-secondary mb-3 mt-3">
          {" "}
          Security{" "}
        </Text>

        <TouchableOpacity className="flex flex-row justify-between mb-3 border rounded-xl  blur-md " activeOpacity={0.4}>
          <View className="flex flex-row space-x-3 items-center">
            <FontAwesome name="lock" size={20} color={Colors.GRAY} />
            <Text className="font-[outfit-medium] text-[16px] text-grey">
              {" "}
              Change Password
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row justify-between mb-3 border rounded-xl  blur-md "  activeOpacity={0.4}>
          <View className="flex flex-row space-x-3 items-center">
            <FontAwesome name="unlock-alt" size={20} color={Colors.GRAY} />
            <Text className="font-[outfit-medium] text-[16px] text-grey">
              {" "}
              Forgot Password
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>

        

        {/* About Section  */}
        <Text className="font-[outfit] text-[14px] text-secondary mb-3 mt-3">
          {" "}
          About
        </Text>
        <TouchableOpacity className="flex flex-row justify-between mb-3 border rounded-xl  blur-md "  activeOpacity={0.4}>
          <View className="flex flex-row space-x-3 items-center">
            <MaterialIcons name="security" size={20} color={Colors.GRAY} />
            <Text className="font-[outfit-medium] text-[16px] text-grey">
              {" "}
              Legal and Policies
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row justify-between mb-3 border rounded-xl  blur-md " activeOpacity={0.4}>
          <View className="flex flex-row space-x-3 items-center">
            <MaterialIcons name="support-agent" size={20} color={Colors.GRAY} />
            <Text className="font-[outfit-medium] text-[16px] text-grey">
              {" "}
              Help & Support
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>

        {/* Danger Section  */}
        {/* <Text className="font-[outfit] text-[14px] text-red-500 mb-2 mt-2">
          {" "}
          Danger
        </Text> */}
        
        {/* <TouchableOpacity className="flex flex-row justify-between mb-4 border rounded-xl  blur-md "
        activeOpacity={0.4}>
          <View className="flex flex-row space-x-3 items-center">
            <MaterialIcons name="delete" size={20} color="rgb(248 113 113)" />
            <Text className="font-[outfit-medium] text-[16px] text-red-400">
              {" "}
              Delete Account
            </Text>
          </View>
         
        </TouchableOpacity> */}

        <TouchableOpacity
          className="flex flex-row justify-center blur-md items-center mt-8"
          onPress={() => handleLogout()}
          activeOpacity={0.4}
        >
          <View className="flex flex-row space-x-1 items-center justify-center w-40 border border-gray-700 py-2 hover:bg-gray-600 rounded-xl ">
            <MaterialIcons name="logout" size={20} color={Colors.GRAY} />
            <Text className="font-[outfit-medium] text-[16px] text-grey">
              {" "}
              Logout
            </Text>
          </View>
          
        </TouchableOpacity>

        
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
