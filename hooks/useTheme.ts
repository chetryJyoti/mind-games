import { storage } from "@/utils/storage";
import { useEffect } from "react";
import { Appearance } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useMMKVBoolean("darkMode", storage);

  useEffect(() => {
    Appearance.setColorScheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return {
    isDarkMode: isDarkMode ?? false,
    toggleDarkMode,
  };
};
