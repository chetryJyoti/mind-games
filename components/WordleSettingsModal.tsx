import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { storage } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";

export type Ref = BottomSheetModal;

const WordleSettingsModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const { dismiss } = useBottomSheetModal();

  const [hardMode, setHardMode] = useMMKVBoolean("hardMode", storage);
  const [highContrastMode, setHighContrastMode] = useMMKVBoolean(
    "highContrastMode",
    storage
  );
  const { isDarkMode, toggleDarkMode } = useTheme();

  const toggleHardMode = () => setHardMode((prev) => !!!prev);
  const toggleHighContrastMode = () => setHighContrastMode((prev) => !!!prev);

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
    [dismiss]
  );

  const theme = Colors[isDarkMode ? "dark" : "light"];

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      handleComponent={null}
    >
      <View
        style={[styles.contentContainer, { backgroundColor: theme.background }]}
      >
        <View style={styles.modalBtns}>
          <Text style={[styles.containerHeadline, { color: theme.text }]}>
            SETTINGS
          </Text>
          <TouchableOpacity onPress={() => dismiss()}>
            <Ionicons name="close" size={28} style={{ color: theme.text }} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <BottomSheetScrollView>
            <View style={styles.settingsContent}>
              <View style={styles.settingRow}>
                <View style={styles.textContainer}>
                  <Text style={[styles.rowTextBig, { color: theme.text }]}>
                    Dark Mode
                  </Text>
                  <Text style={[styles.rowTextSmall, { color: theme.text }]}>
                    Change the app theme
                  </Text>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ true: "#000" }}
                  ios_backgroundColor="#9a9a9a"
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.textContainer}>
                  <Text style={[styles.rowTextBig, { color: theme.text }]}>
                    Hard Mode
                  </Text>
                  <Text style={[styles.rowTextSmall, { color: theme.text }]}>
                    Any revealed hints must be used in subsequent guesses
                  </Text>
                </View>
                <Switch
                  value={hardMode}
                  onValueChange={toggleHardMode}
                  trackColor={{ true: "#000" }}
                  ios_backgroundColor="#9a9a9a"
                />
              </View>

              <View style={styles.settingRow}>
                <View style={styles.textContainer}>
                  <Text style={[styles.rowTextBig, { color: theme.text }]}>
                    High Contrast Mode
                  </Text>
                  <Text style={[styles.rowTextSmall, { color: theme.text }]}>
                    Contrast and colorblindness improvements
                  </Text>
                </View>
                <Switch
                  value={highContrastMode}
                  onValueChange={toggleHighContrastMode}
                  trackColor={{ true: "#000" }}
                  ios_backgroundColor="#9a9a9a"
                />
              </View>
            </View>
          </BottomSheetScrollView>
        </View>
      </View>
    </BottomSheetModal>
  );
});

WordleSettingsModal.displayName = "WordleSettingsModal";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerHeadline: {
    fontSize: 20,
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  settingsContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  rowTextBig: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rowTextSmall: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 5,
  },
});

export default WordleSettingsModal;
