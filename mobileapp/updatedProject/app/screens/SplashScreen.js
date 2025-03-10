import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Video, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import videoFile from "../../assets/video.mp4";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/SignUp");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video source={videoFile} style={styles.video} resizeMode="cover" shouldPlay />
      <Text style={styles.title}>SAFE STREET</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/SignUp")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  video: { position: "absolute", width: "100%", height: "100%" },
  title: { fontSize: 30, fontWeight: "bold", color: "white", marginBottom: 20 },
  button: { backgroundColor: "#FF5733", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default SplashScreen;
