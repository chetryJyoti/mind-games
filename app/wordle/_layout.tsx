import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

const WordleLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="game"
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "Wordle",
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerBackTitleStyle: {
            fontSize: 24,
            fontFamily: "FrankRuhlLibre_800ExtraBold",
          },
        }}
      />
    </Stack>
  );
};

export default WordleLayout;
