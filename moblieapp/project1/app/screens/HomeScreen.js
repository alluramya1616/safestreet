import React from "react";
import { View, Text } from "react-native";
import BottomNavigation from "../../components/BottomNavigation";
import styles from "../../components/ui/styles";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SafeStreet</Text>
      <BottomNavigation />
    </View>
  );
};

export default HomeScreen;
