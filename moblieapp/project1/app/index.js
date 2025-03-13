/*import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/screens/SplashScreen");
  }, []);

  return null;
}
*/
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/screens/SplashScreen" />;  // ✅ Redirects properly
};
