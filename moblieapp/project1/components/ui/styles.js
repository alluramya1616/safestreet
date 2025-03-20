import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5, width: "80%" },
  button: { backgroundColor: "blue", padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: "white", textAlign: "center", fontSize: 18 },

  // Sign-In
  passwordContainer: { flexDirection: "row", alignItems: "center", width: "80%" },
  showHide: { marginLeft: -40, fontSize: 18 },

  // Profile Blocks
  profileBlock: { width: "90%", padding: 15, marginVertical: 10, backgroundColor: "#ddd", borderRadius: 10 },
  blockTitle: { fontWeight: "bold", marginBottom: 5 },

  // Notifications
  notificationBlock: { backgroundColor: "#f1f1f1", padding: 10, marginVertical: 5, borderRadius: 5 },
  notificationText: { fontSize: 16 },
});
