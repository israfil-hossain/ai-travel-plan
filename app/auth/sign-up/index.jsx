import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import ParallaxScrollView from "./../../../components/ParallaxScrollView";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import * as Yup from "yup";
import { signUpWithEmail } from "../../../firebase-api/auth";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user)); // Store user data in AsyncStorage
        setUser(user); // Update Zustand store
        console.log("User signed up successfully:", user);
        router.replace("/(tabs)/mytrip"); // Navigate to the main screen
      }
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      // Show error message to the user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ParallaxScrollView>
      <View className="mt-12">
        <Text className="font-[outfit-bold] text-2xl text-primary">
          Create New Account
        </Text>
      </View>
      <Formik
        initialValues={{ fullName: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="mt-10 shadow-lg bg-gray-200 px-5 py-5 rounded-lg">
            <View className="mt-5">
              <Text className="font-[outfit]">Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Full Name"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
            </View>

            <View className="mt-5">
              <Text className="font-[outfit]">Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View className="mt-5">
              <Text className="font-[outfit]">Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[{ flex: 1 }]}
                  placeholder="Enter Password"
                  secureTextEntry={!passwordVisible} // Toggle password visibility
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.toggleButton}
                >
                  <Text>{passwordVisible ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.signUpButton}
            >
              <Text className="text-white text-center font-[outfit] text-lg">
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-5 p-2"
              onPress={() => router.replace("auth/sign-in")}
            >
              <Text className="font-[outfit] text-[16px] text-center">
                You already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    padding: 15,
    fontFamily: "outfit",
  },
  toggleButton: {
    marginLeft: 10,
  },
  signUpButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 20,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
