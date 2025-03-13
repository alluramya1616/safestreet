import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import styles from "./ui/styles";

const BottomNavigation = () => {
  const router = useRouter();

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={() => router.push("/screens/HomeScreen")}>
        <Text style={styles.icon}>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/screens/CaptureScreen")}>
        <Text style={styles.icon}>📷</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/screens/NotificationScreen")}>
        <Text style={styles.icon}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
