import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StarProgress = ({ uploadedPics }) => {
  const totalStars = 3;
  const starsEarned = Math.min(uploadedPics, totalStars);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stars Earned: {starsEarned}/{totalStars}</Text>
      <View style={styles.starContainer}>
        {Array.from({ length: totalStars }).map((_, index) => (
          <Text key={index} style={index < starsEarned ? styles.goldStar : styles.grayStar}>⭐</Text>
        ))}
      </View>
      <Text style={styles.info}>Upload {totalStars - starsEarned} more images to earn a certificate!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 20 },
  text: { fontSize: 18, fontWeight: "bold" },
  starContainer: { flexDirection: "row", marginVertical: 10 },
  goldStar: { fontSize: 32, color: "gold" },
  grayStar: { fontSize: 32, color: "gray" },
  info: { fontSize: 14, color: "#555" },
});

export default StarProgress;
