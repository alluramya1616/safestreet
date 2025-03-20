// import { Stack } from "expo-router";

// export default function Layout() {
//   return (
//     <Stack>
//       {/* Splash Screen - No Header */}
//       <Stack.Screen name="screens/SplashScreen" options={{ headerShown: false }} />

//       {/* Authentication Screens - No Header */}
//       <Stack.Screen name="screens/SignUpScreen" options={{ headerShown: false }} />
//       <Stack.Screen name="screens/SignInScreen" options={{ headerShown: false }} />

//       {/* Main App Screens */}
//       <Stack.Screen name="screens/HomeScreen" options={{ headerShown: false }} />
//       <Stack.Screen name="screens/ProfileScreen" options={{ headerShown: false }} />
//       <Stack.Screen name="screens/CaptureScreen" options={{ headerShown: false }} />
//       <Stack.Screen name="screens/NotificationScreen" options={{ headerShown: false }} />
//     </Stack>
//   );
// }
/*
import { Stack, Slot } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SplashScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SignUpScreen" />
      <Stack.Screen name="screens/SignInScreen" />
      <Stack.Screen name="screens/HomeScreen" />
      <Stack.Screen name="screens/ProfileScreen" />
      <Stack.Screen name="screens/CaptureScreen" />
      <Stack.Screen name="screens/NotificationScreen" />
    </Stack>
  );
}
*/
// import { Slot } from "expo-router";

// export default function Layout() {
//   return <Slot />;  // ✅ This ensures correct navigation handling
// };
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide headers for all screens
      }}
    />
  );
}
