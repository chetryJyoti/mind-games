import Logo from "@/assets/images/nyt-logo.svg";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

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
          headerTitle: () => <Logo width={150} height={40} />,
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
