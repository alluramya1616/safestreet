import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../../components/ui/styles";

const NotificationScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.notificationBlock}>
        <Text style={styles.notificationText}>✅ Your recent image upload was successful!</Text>
      </View>
      <View style={styles.notificationBlock}>
        <Text style={styles.notificationText}>⭐ You earned 1 new star for your contributions!</Text>
      </View>
      <View style={styles.notificationBlock}>
        <Text style={styles.notificationText}>📢 New feature update: Capture with AI detection is live!</Text>
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;
