import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const BottomNavigation = () => {
  const router = useRouter();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => router.push("/Home")}>
        <Text style={styles.icon}>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/Capture")}>
        <Text style={styles.icon}>📸</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/Notification")}>
        <Text style={styles.icon}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    padding: 15, 
    backgroundColor: "#ddd", 
    position: "absolute", 
    bottom: 0, 
    width: "100%" 
  },
  icon: { fontSize: 24 }
});

export default BottomNavigation;
