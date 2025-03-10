import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Profile = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={styles.block}><Text>👤 Personal Info</Text></View>
      <View style={styles.block}><Text>📸 Uploaded: X | ⭐ Stars Left: Y</Text></View>
      <View style={styles.block}>
        <TouchableOpacity><Text>⚙️ Settings</Text></TouchableOpacity>
        <TouchableOpacity><Text>🚪 Logout</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = { block: { padding: 20, borderWidth: 1, marginVertical: 10, borderRadius: 10 } };

export default Profile;
