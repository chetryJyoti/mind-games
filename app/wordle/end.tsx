import Icon from "@/assets/images/wordle-icon.svg";
import { Colors } from "@/constants/Colors";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EndPage = () => {
  const { win, word, gameField } = useLocalSearchParams<{
    win: string;
    word: string;
    gameField?: string;
  }>();

  const [userScore, setUserScore] = useState<any>({
    played: 42,
    won: 42,
    currentStreak: 42,
  });

  const shareGame = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      alert("Mail app is not available on this device.");
      return;
    }
    console.log("Sharing game...");
    const game = JSON.parse(gameField!);
    const imageText: string[][] = [];

    const wordLetters = word.split("");
    game.forEach((row: string[]) => {
      const rowText = row.map((letter, index) => {
        if (letter === wordLetters[index]) {
          return `\x1b[32m${letter}\x1b[0m`; // Green for correct letters
        } else if (wordLetters.includes(letter)) {
          return `\x1b[33m${letter}\x1b[0m`; // Yellow for present letters
        } else {
          return `\x1b[31m${letter}\x1b[0m`; // Red for incorrect letters
        }
      });
      imageText.push(rowText);
    });

    const shareContent = `Wordle Game Result:\n\n${imageText
      .map((row) => row.join(" "))
      .join("\n")}\n\nWord: ${word}`;
    console.log(shareContent);

    try {
      const result = await MailComposer.composeAsync({
        subject: "Wordle Game Result",
        body: shareContent,
        isHtml: false,
      });
      console.log("MailComposer result:", result);
    } catch (error) {
      console.error("MailComposer error:", error);
      alert("Failed to open mail composer.");
    }
  };

  const restartGame = () => {
    router.dismiss();
    router.push("/wordle");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => restartGame()}
        style={{ alignSelf: "flex-end" }}
      >
        <Ionicons name="close" size={32} color={Colors.light.gray} />
      </TouchableOpacity>
      <View style={styles.header}>
        {win === "true" ? (
          <Image
            source={require("../../assets/images/win.png")}
            style={{ width: 80, height: 80 }}
          />
        ) : (
          <Icon width={100} height={100} />
        )}
        <Text style={styles.headerText}>
          {win === "true" ? "Congratulations" : "Thanks for playing today!"}
        </Text>
        <SignedOut>
          <Text style={styles.text}>Want to see your stats and streaks?</Text>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-up")}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Create a free account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
            <Text style={styles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </SignedOut>
        <SignedIn>
          <Text style={styles.text}>Statistics</Text>
          <View style={styles.stats}>
            <View>
              <Text style={styles.score}> {userScore.played}</Text>
              <Text>Played</Text>
            </View>
            <View>
              <Text style={styles.score}> {userScore.won}</Text>
              <Text>Wins</Text>
            </View>
            <View>
              <Text style={styles.score}> {userScore.currentStreak}</Text>
              <Text>Current Streak</Text>
            </View>
          </View>
        </SignedIn>
        <View
          style={{
            width: "100%",
            height: StyleSheet.hairlineWidth,
            backgroundColor: "#4e4e4e",
          }}
        />
        <TouchableOpacity onPress={shareGame} style={styles.shareBtn}>
          <Text style={styles.btnText}>Share</Text>
          <Ionicons name="share-social" size={24} color="#fff" s />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EndPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "FrankRuhlLibre_800ExtraBold",
    textAlign: "center",
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  btn: {
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  btnText: {
    padding: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  textLink: {
    textDecorationLine: "underline",
    fontSize: 16,
    paddingVertical: 14,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    gap: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  shareBtn: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.green,
    borderRadius: 30,
    width: "100%",
  },
});
