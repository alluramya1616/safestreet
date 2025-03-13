import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "../../components/ui/styles";

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Block 1: Personal Information */}
      <View style={styles.profileBlock}>
        <Text style={styles.blockTitle}>Personal Info</Text>
        <Text>Username: JohnDoe</Text>
        <Text>Email: johndoe@example.com</Text>
      </View>

      {/* Block 2: Upload Progress */}
      <View style={styles.profileBlock}>
        <Text style={styles.blockTitle}>Progress</Text>
        <Text>Images Uploaded: 10</Text>
        <Text>Stars Earned: 2</Text>
        <Text>Stars Left for Certificate: 1</Text>
      </View>

      {/* Block 3: Settings & Logout */}
      <View style={styles.profileBlock}>
        <Text style={styles.blockTitle}>Settings</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/SignInScreen")}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
