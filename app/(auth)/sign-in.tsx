import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

try {
  if (typeof WebBrowser.warmUpAsync === "function") {
    WebBrowser.warmUpAsync();
  }
} catch (e) {
  console.warn("WebBrowser.warmUpAsync is not available:", e);
}

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { startSSOFlow } = useSSO();

  const handleOAuth = useCallback(
    async (strategy: "oauth_google" | "oauth_apple") => {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy,
          redirectUrl: AuthSession.makeRedirectUri({ useProxy: true }),
        });

        if (!createdSessionId) {
          console.error("No session created");
          return;
        }

        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.back();
        }
      } catch (err) {
        console.error("OAuth error:", err);
      }
    },
    [startSSOFlow, router]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Log in or create an account</Text>
      <Text style={styles.subText}>
        By continuing, you agree to the Terms of Sale, Terms of Service, and
        Privacy Policy.
      </Text>

      <Text style={styles.inputLabel}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={defaultStyles.btn}
        onPress={() => {
          console.log("Email auth not implemented yet");
          // TODO: Implement email link/passwordless flow
        }}
      >
        <Text style={defaultStyles.btnText}>Continue with email</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>
        <View style={styles.separatorLine} />
        <Text style={styles.separator}>OR</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => handleOAuth("oauth_google")}
        >
          <Ionicons name="logo-google" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => handleOAuth("oauth_apple")}
        >
          <Ionicons name="logo-apple" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingHorizontal: 40,
    paddingTop: 30,
    alignItems: "stretch",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
    textAlign: "center",
  },
  subText: {
    fontSize: 15,
    color: "#4f4f4f",
    textAlign: "center",
    marginBottom: 30,
  },
  inputLabel: {
    paddingBottom: 5,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  separatorView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  separatorLine: {
    flex: 1,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separator: {
    marginHorizontal: 10,
    fontFamily: "mon-sb",
    color: Colors.light.gray,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    height: 50,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  btnIcon: {
    marginRight: 10,
  },
});
