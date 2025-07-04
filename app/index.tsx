import Icon from "@/assets/images/wordle-icon.svg";
import SubscribeModal from "@/components/SubscribeModal";
import { Colors } from "@/constants/Colors";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const subscribeModalRef = useRef<BottomSheet>(null);

  const handlePresentSubscribeModal = () =>
    subscribeModalRef.current?.present();

  const goToGame = (gameName: string) => {
    if (gameName === "Wordle") {
      router.push(`/${gameName.toLowerCase()}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SubscribeModal ref={subscribeModalRef} />
      <View style={[styles.topBar, { borderBottomColor: theme.text }]}>
        <Text style={[styles.logo, { color: theme.text }]}>MindGames</Text>
      </View>
      <View style={styles.navButtons}>
        <SignedOut>
          <TouchableOpacity
            style={[
              styles.navBtn,
              { borderColor: theme.text, backgroundColor: theme.gameBg },
            ]}
            onPress={() => router.push("/sign-in")}
          >
            <Text style={[styles.navBtnText, { color: theme.text }]}>
              Login
            </Text>
          </TouchableOpacity>
        </SignedOut>
        <SignedIn>
          <TouchableOpacity
            style={[
              styles.navBtn,
              { borderColor: theme.text, backgroundColor: theme.gameBg },
            ]}
          >
            <Text style={[styles.navBtnText, { color: theme.text }]}>
              Log out
            </Text>
          </TouchableOpacity>
        </SignedIn>
        <TouchableOpacity
          style={[
            styles.navBtn,
            { borderColor: theme.text, backgroundColor: theme.gameBg },
          ]}
          onPress={handlePresentSubscribeModal}
        >
          <Text style={[styles.navBtnText, { color: theme.text }]}>
            Subscribe
          </Text>
        </TouchableOpacity>
      </View>
      {/* Game Grid */}
      <View style={styles.grid}>
        {/* Active Wordle Game */}
        <Pressable
          style={({ pressed }) => [
            styles.gameItem,
            styles.activeGame,
            { borderColor: theme.text, backgroundColor: theme.gameBg },
            pressed && [
              styles.activeGamePressed,
              { backgroundColor: theme.gray },
            ],
          ]}
          onPress={() => goToGame("Wordle")}
        >
          <View style={styles.iconContainer}>
            <Icon width={80} height={80} />
          </View>
          <Text style={[styles.gameLabel, { color: theme.text }]}>Wordle</Text>
          <Text style={[styles.subTitle, { color: theme.text }]}>
            Get 6 chances to guess a 5-letter word.
          </Text>
        </Pressable>

        {/* Coming Soon Games */}
        <Pressable
          style={[
            styles.gameItem,
            { borderColor: theme.text, backgroundColor: theme.gameBg },
          ]}
          disabled={true}
        >
          <View style={styles.iconContainer}>
            <View
              style={[
                styles.placeholderIcon,
                { backgroundColor: theme.gameBg, borderColor: theme.text },
              ]}
            >
              <Text style={[styles.placeholderText, { color: theme.text }]}>
                9
              </Text>
            </View>
          </View>
          <Text style={[styles.gameLabel, { color: theme.text }]}>Sudoku</Text>
          <Text style={[styles.subTitle, { color: theme.text }]}>
            Classic number puzzle game to test your logic.
          </Text>
          <View
            style={[styles.comingSoonBadge, { backgroundColor: theme.text }]}
          >
            <Text style={[styles.comingSoonText, { color: theme.background }]}>
              Coming Soon
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={[
            styles.gameItem,
            { borderColor: theme.text, backgroundColor: theme.gameBg },
          ]}
          disabled={true}
        >
          <View style={styles.iconContainer}>
            <View
              style={[
                styles.placeholderIcon,
                { backgroundColor: theme.gameBg, borderColor: theme.text },
              ]}
            >
              <Text style={[styles.placeholderText, { color: theme.text }]}>
                2048
              </Text>
            </View>
          </View>
          <Text style={[styles.gameLabel, { color: theme.text }]}>2048</Text>
          <Text style={[styles.subTitle, { color: theme.text }]}>
            Slide tiles to reach the 2048 tile.
          </Text>
          <View
            style={[styles.comingSoonBadge, { backgroundColor: theme.text }]}
          >
            <Text style={[styles.comingSoonText, { color: theme.background }]}>
              Coming Soon
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={[
            styles.gameItem,
            { borderColor: theme.text, backgroundColor: theme.gameBg },
          ]}
          disabled={true}
        >
          <View style={styles.iconContainer}>
            <View
              style={[
                styles.placeholderIcon,
                { backgroundColor: theme.gameBg, borderColor: theme.text },
              ]}
            >
              <Text style={[styles.placeholderText, { color: theme.text }]}>
                ♠
              </Text>
            </View>
          </View>
          <Text style={[styles.gameLabel, { color: theme.text }]}>
            Solitaire
          </Text>
          <Text style={[styles.subTitle, { color: theme.text }]}>
            Classic card game for one player.
          </Text>
          <View
            style={[styles.comingSoonBadge, { backgroundColor: theme.text }]}
          >
            <Text style={[styles.comingSoonText, { color: theme.background }]}>
              Coming Soon
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topBar: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
  },
  navButtons: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  navBtn: {
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navBtnText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    paddingTop: 20,
  },
  gameItem: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    padding: 20,
    width: 160,
    position: "relative",
    opacity: 0.5,
  },
  activeGame: {
    opacity: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 8,
  },
  activeGamePressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  iconContainer: {
    marginBottom: 12,
  },
  placeholderIcon: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  gameLabel: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subTitle: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
    marginBottom: 12,
  },
  comingSoonBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
