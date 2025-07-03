import Icon from "@/assets/images/wordle-icon.svg";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon width={100} height={100} style={styles.icon} />
        <Text style={styles.title}>Wordle</Text>
        <Text style={styles.subTitle}>
          Get 6 chances to guess a 5-letter word.
        </Text>

        <Link href={"/wordle/game"} asChild>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Play</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made by JC</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between", // space content + footer
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
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
    borderColor: "#000",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#000",
  },
});
