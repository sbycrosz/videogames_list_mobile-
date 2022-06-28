import { StyleSheet } from "react-native";
import NativeTachyons from "react-native-style-tachyons";

import App from "./src";

NativeTachyons.build(
  {
    rem: 16,
    colors: {
      palette: {
        primary: "#3FB6B2",
        accent: "#6DC849",
        textPrimary: "#FFFFFF",
        textSecondary: "#AAAAAA",
        background: "#000000",
        backgroundCard: "#202020",
      },
    },
  },
  StyleSheet
);

export default App;
