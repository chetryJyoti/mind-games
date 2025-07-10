import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import disc from "@jsamr/counter-style/presets/disc";
import MarkedList from "@jsamr/react-native-li";
import { Link } from "expo-router";

export type Ref = BottomSheetModal;

const BENEFITS = [
  "Enjoy full access to Wordle, Spelling Bee, The Crossword and more.",
  "Play new puzzles every day for concentration or relaxation.",
  "Strengthen your strategy with WordleBot.",
  "Unlock over 10,000 puzzles in our Wordle, Spelling Bee and crossword archives.",
  "Track your stats and streaks on any device.",
];

const SubscribeModal = forwardRef<Ref>((props, ref) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const snapPoints = useMemo(() => ["90%"], []);
  const { dismiss } = useBottomSheetModal();
  const { bottom } = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={dismiss}
      />
    ),
    [dismiss] // Add dismiss to dependencies
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      handleComponent={null}
    >
      <View
        style={[styles.contentContainer, { backgroundColor: theme.background }]}
      >
        <View style={styles.modalBtns}>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity>
              <Text style={[styles.textBtn, { color: theme.text }]}>
                LOG IN
              </Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={() => dismiss()}>
            <Ionicons name="close" size={28} color={theme.text} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <BottomSheetScrollView>
            <Text style={[styles.containerHeadline, { color: theme.text }]}>
              Unlimited Play.{"\n"}Try free for 7 days.
            </Text>
            <Image
              source={require("@/assets/images/games.png")}
              style={styles.image}
            />

            <View style={{ marginVertical: 20 }}>
              <MarkedList
                counterRenderer={disc}
                lineStyle={{
                  paddingHorizontal: 40,
                  gap: 10,
                  marginVertical: 10,
                }}
              >
                {BENEFITS.map((value, index) => (
                  <Text
                    key={index}
                    style={[styles.listText, { color: theme.text }]}
                  >
                    {value}
                  </Text>
                ))}
              </MarkedList>
            </View>
            <Text style={[styles.disclaimer, { color: theme.text }]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              iusto possimus, amet molestiae aspernatur iure natus? Voluptates
              deserunt delectus expedita fugiat fuga non distinctio, error
              nesciunt ullam eligendi animi quod, voluptatum esse laborum eos at
              nulla? Excepturi repellendus, veniam ab numquam beatae corporis.
              Cupiditate animi amet odio blanditiis voluptates a excepturi eius
              fuga. Cumque iste dignissimos deserunt quae, molestiae ullam.
            </Text>
          </BottomSheetScrollView>
          <View
            style={[
              styles.footer,
              { paddingBottom: bottom, backgroundColor: theme.background },
            ]}
          >
            <TouchableOpacity style={defaultStyles.btn}>
              <Text style={defaultStyles.btnText}>Try 7 days free</Text>
            </TouchableOpacity>
            <Text style={[styles.footerText, { color: theme.text }]}>
              ₹99/month after 7-day trial. Cancel anytime.
            </Text>
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
});

SubscribeModal.displayName = "SubscribeModal";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "space-between", 
  },

  containerHeadline: {
    fontSize: 34,
    padding: 20,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_900Black",
  },
  image: {
    width: "90%",
    alignSelf: "center",
    height: 40,
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  textBtn: {
    fontSize: 14,
    fontWeight: "bold",
  },
  listText: {
    fontSize: 14,
    flexShrink: 1,
  },
  disclaimer: {
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 30,
    lineHeight: 18,
    marginBottom: 20,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    paddingTop: 20,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    paddingTop: 10,
  },
});

export default SubscribeModal;
