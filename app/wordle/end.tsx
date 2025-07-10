import Icon from "@/assets/images/wordle-icon.svg";
import { Colors } from "@/constants/Colors";
import { FIRESTORE_DB } from "@/utils/FirebaseConfig";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { router, useLocalSearchParams } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EndPage = () => {
  const { user } = useUser();
  const { won, word, gameField } = useLocalSearchParams<{
    won: string;
    word: string;
    gameField?: string;
  }>();

  const [userScore, setUserScore] = useState<any>({});

  const shareGame = () => {
    const game = JSON.parse(gameField!);
    const imageText: string[][] = [];

    const wordLetters = word.split("");

    game.forEach((row: [], rowIndex: number) => {
      imageText.push([]);
      row.forEach((letter, index) => {
        if (letter === wordLetters[index]) {
          imageText[rowIndex].push("🟩");
        } else if (wordLetters.includes(letter)) {
          imageText[rowIndex].push("🟨");
        } else {
          imageText[rowIndex].push("⬜");
        }
      });
    });

    const html = `
      <html>
        <head>
          <style>

            .game {
              display: flex;
              flex-direction: column;
            }
              .row {
              display: flex;
              flex-direction: row;

              }
            .cell {
              display: flex;
              justify-content: center;
              align-items: center;
            }

          </style>
        </head>
        <body>
          <h1>Wordle</h1>
          <div class="game">
           ${imageText
             .map(
               (row) =>
                 `<div class="row">${row
                   .map((cell) => `<div class="cell">${cell}</div>`)
                   .join("")}</div>`
             )
             .join("")}
          </div>
        </body>
      </html>
    `;

    MailComposer.composeAsync({
      subject: `I just played Wordle!`,
      body: html,
      isHtml: true,
    });
  };
  
  const restartGame = () => {
    router.dismiss();
    router.push("/wordle");
  };

  useEffect(() => {
    if (user) {
      updateUserScore();
    }
  }, [user]);

  const updateUserScore = async () => {
    if (!user) return;
    console.log("Updating user score...", user.id);

    const docRef = doc(FIRESTORE_DB, `users/${user.id}/wordle/stats`);
    const docSnap = await getDoc(docRef);

    console.log("Document snapshot:", docSnap.exists(), docSnap.data());

    let newScore = {
      played: 1,
      wins: won === "true" ? 1 : 0,
      lastGame: won === "true" ? "won" : "lost",
      currentStreak: won === "true" ? 1 : 0,
    };

    if (docSnap.exists()) {
      const data = docSnap.data();
      newScore = {
        played: data.played + 1,
        wins: data.wins + (won === "true" ? 1 : 0),
        lastGame: won === "true" ? "won" : "lost",
        currentStreak:
          won === "true" && data.lastGame === "won"
            ? data.currentStreak + 1
            : won === "true"
            ? 1
            : 0,
      };
    }
    console.log("New score to update:", newScore);
    await setDoc(docRef, newScore, { merge: true });
    setUserScore(newScore);
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
        {won === "true" ? (
          <Image
            source={require("../../assets/images/win.png")}
            style={{ width: 80, height: 80 }}
          />
        ) : (
          <Icon width={100} height={100} />
        )}
        <Text style={styles.headerText}>
          {won === "true" ? "Congratulations" : "Thanks for playing today!"}
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
              <Text style={styles.score}> {userScore.wins}</Text>
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
