import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import CaptureOptions from "../../components/CaptureOptions";
import styles from "../../components/ui/styles";

const CaptureScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // "success" or "failure"
  const [stars, setStars] = useState(0);

  // Open Camera
  const openCamera = () => {
    launchCamera({ mediaType: "photo", saveToPhotos: true }, (response) => {
      if (!response.didCancel && response.assets) {
        setImageUri(response.assets[0].uri);
        handleUpload();
      }
    });
  };

  // Open Gallery
  const openGallery = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        setImageUri(response.assets[0].uri);
        handleUpload();
      }
    });
  };

  // Simulate Upload
  const handleUpload = () => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      if (isSuccess) {
        setUploadStatus("success");
        setStars(stars + 1);
      } else {
        setUploadStatus("failure");
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture Road Damage</Text>
      
      <CaptureOptions onCameraPress={openCamera} onGalleryPress={openGallery} />

      {/* Display Selected Image */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      {/* Upload Status */}
      {uploadStatus === "success" && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>✅ Uploaded Successfully</Text>
          <Text style={styles.starText}>✨ {3 - stars} stars left for a certificate</Text>
        </View>
      )}
      {uploadStatus === "failure" && (
        <View style={styles.failureContainer}>
          <Text style={styles.failureText}>❌ Upload Failed</Text>
        </View>
      )}
    </View>
  );
};

export default CaptureScreen;