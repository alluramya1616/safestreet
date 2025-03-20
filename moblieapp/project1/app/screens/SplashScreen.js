// import React, { useEffect } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";
// import styles from "../../components/ui/styles";

// const SplashScreen = () => {
//   const router = useRouter();

//   useEffect(() => {
//     setTimeout(() => router.push("/screens/SignUpScreen"), 5000);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>SAFE STREET</Text>
//       <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/SignUpScreen")}>
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SplashScreen;
// import React, { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";
// import styles from "../../components/ui/styles";

// const SplashScreen = () => {
//   const router = useRouter();
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     const timer = setTimeout(() => {
//       if (isMounted) router.push("/screens/SignUpScreen");
//     }, 5000);

//     return () => {
//       setIsMounted(false);
//       clearTimeout(timer);
//     };
//   }, [isMounted]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>SAFE STREET</Text>
//       <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/SignUpScreen")}>
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SplashScreen;
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "../../components/ui/styles";

const SplashScreen = () => {
  const router = useRouter();
  
  useEffect(() => {
    let isMounted = true; // Local variable instead of state

    const timer = setTimeout(() => {
      if (isMounted) router.push("/screens/SignUpScreen");
    }, 5000);

    return () => {
      isMounted = false; // Clean up
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SAFE STREET</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/SignUpScreen")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
