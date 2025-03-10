import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Capture = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture Options</Text>
      <TouchableOpacity style={styles.button}><Text>📷 Take Photo</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text>🖼️ Select from Gallery</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text>📤 Upload</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: "gray", padding: 15, margin: 10, borderRadius: 5 },
});

export default Capture;
