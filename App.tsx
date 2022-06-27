import { StyleSheet } from "react-native";
import NativeTachyons from "react-native-style-tachyons";

import App from "./src";

NativeTachyons.build(
  {
    rem: 16,
    colors: {
      palette: {
        primary: "#3FB6B2",
        textPrimary: "#072340",
        textSecondary: "#666666",
        borderPrimary: "#D8D8D8"
      }
    }
  },
  StyleSheet
);

export default App;
