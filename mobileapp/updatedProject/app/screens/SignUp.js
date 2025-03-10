import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="Username" style={styles.input} onChangeText={(val) => setForm({ ...form, username: val })} />
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" onChangeText={(val) => setForm({ ...form, email: val })} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={(val) => setForm({ ...form, password: val })} />
      <TouchableOpacity style={styles.button} onPress={() => router.push("/Home")}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/SignIn")}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({ ... });

export default SignUp;
