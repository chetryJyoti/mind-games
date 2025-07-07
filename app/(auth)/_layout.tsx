import Logo from "@/assets/images/mg-logo.png";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="sign-up" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "modal",
          headerShadowVisible: false,
          headerTitle: () => (
            <Image source={Logo} style={{ width: 280, height: 30 }} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={26} color={Colors.dark.gray} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
