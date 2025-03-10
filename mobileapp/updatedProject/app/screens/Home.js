import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import BottomNavigation from "../../components/BottomNavigation";

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => router.push("/Profile")}><Text>👤</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/About")}><Text>ℹ️</Text></TouchableOpacity>
      </View>
      <Text style={styles.info}>
        SafeStreet is a web and app-based application. The website is for authorized personnel,
        while the app is accessible to everyone for reporting road damages.
      </Text>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  topIcons: { flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 20 },
  info: { textAlign: "center", padding: 20 },
});

export default Home;
