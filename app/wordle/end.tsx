import Icon from "@/assets/images/wordle-icon.svg";
import { Colors } from "@/constants/Colors";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
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

  const shareGame = () => {
    // Implement share game logic here
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
            onPress={() => {
              console.log("Navigating to sign-up");
              router.push("/sign-up");
            }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Create a free account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
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
    width: "70%",
  },
});
