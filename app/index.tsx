import Icon from "@/assets/images/wordle-icon.svg";
import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const goToGame = (gameName: string) => {
    if (gameName === "Wordle") {
      router.push(`/${gameName.toLowerCase()}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>MindGames</Text>
      </View>
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navBtnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navBtnText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
      {/* Game Grid */}
      <View style={styles.grid}>
        {/* Active Wordle Game */}
        <Pressable
          style={({ pressed }) => [
            styles.gameItem,
            styles.activeGame,
            pressed && styles.activeGamePressed,
          ]}
          onPress={() => goToGame("Wordle")}
        >
          <View style={styles.iconContainer}>
            <Icon width={80} height={80} />
          </View>
          <Text style={styles.gameLabel}>Wordle</Text>
          <Text style={styles.subTitle}>
            Get 6 chances to guess a 5-letter word.
          </Text>
        </Pressable>

        {/* Coming Soon Games */}
        <Pressable style={styles.gameItem} disabled={true}>
          <View style={styles.iconContainer}>
            <View style={styles.placeholderIcon}>
              <Text style={styles.placeholderText}>9</Text>
            </View>
          </View>
          <Text style={styles.gameLabel}>Sudoku</Text>
          <Text style={styles.subTitle}>
            Classic number puzzle game to test your logic.
          </Text>
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        </Pressable>

        <Pressable style={styles.gameItem} disabled={true}>
          <View style={styles.iconContainer}>
            <View style={styles.placeholderIcon}>
              <Text style={styles.placeholderText}>2048</Text>
            </View>
          </View>
          <Text style={styles.gameLabel}>2048</Text>
          <Text style={styles.subTitle}>
            Slide tiles to reach the 2048 tile.
          </Text>
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        </Pressable>

        <Pressable style={styles.gameItem} disabled={true}>
          <View style={styles.iconContainer}>
            <View style={styles.placeholderIcon}>
              <Text style={styles.placeholderText}>♠</Text>
            </View>
          </View>
          <Text style={styles.gameLabel}>Solitaire</Text>
          <Text style={styles.subTitle}>Classic card game for one player.</Text>
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topBar: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
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
    color: "#000000",
    letterSpacing: 1,
  },
  navBtn: {
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  navBtnText: {
    fontSize: 14,
    color: "#000000",
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
    borderColor: "#000000",
    borderRadius: 8,
    padding: 20,
    width: 160,
    backgroundColor: "#ffffff",
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
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  activeGamePressed: {
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  gameLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subTitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#000000",
    lineHeight: 16,
    marginBottom: 12,
  },
  comingSoonBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#000000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  comingSoonText: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
