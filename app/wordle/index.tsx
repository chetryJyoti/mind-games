import Icon from "@/assets/images/wordle-icon.svg";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function WordlePage() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.topBar, { borderBottomColor: theme.text }]}>
        <Ionicons
          name="arrow-back-outline"
          size={28}
          color={theme.text}
          onPress={() => router.back()}
        />
        <Text style={styles.logo}>MindGames</Text>
        <Text></Text>
      </View>
      <View style={styles.content}>
        <Icon width={100} height={100} style={styles.icon} />
        <Text style={[styles.title, { color: theme.text }]}>Wordle</Text>
        <Text style={[styles.subTitle, { color: theme.text }]}>
          Get 6 chances to guess a 5-letter word.
        </Text>

        <TouchableOpacity
          style={[
            styles.btn,
            {
              borderColor: theme.text,
              backgroundColor: theme.gameBg,
            },
          ]}
          onPress={() => router.push("/wordle/game")}
        >
          <Text style={[styles.btnText, { color: theme.text }]}>Play</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text
          style={[styles.footerText, { color: theme.text, fontWeight: "bold" }]}
        >
          {format(new Date(), "MMMM d, yyyy")}
        </Text>
        <Text style={[styles.footerText, { color: theme.text }]}>
          {" "}
          No. 3345
        </Text>
        <Text style={[styles.footerText, { color: theme.text }]}>
          Edited by JC
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  topBar: {
    width: "100%",
    paddingBottom: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
  },
  content: {
    alignItems: "center",
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },
  subTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  btn: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    gap: 6,
  },
  footerText: {
    fontSize: 16,
  },
});
