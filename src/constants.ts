// API
export const RAWG_API_BASE_URL = "https://api.rawg.io";
export const RAWG_API_KEY = "61b1a8a3b8b14d89bc683cb1b7e0fdfb"; // Should keep this in the backend

// UI
const REM_SIZE = 16;

// Dark mode
const COLORS = {
  primary: "#3FB6B2",
  accent: "#6DC849",
  textPrimary: "#FFFFFF",
  textSecondary: "#AAAAAA",
  background: "#000000",
  backgroundCard: "#202020",
};

// Light mode
// const COLORS = {
//   primary: "#3FB6B2",
//   accent: "#6DC849",
//   textPrimary: "#131313",
//   textSecondary: "#666666",
//   background: "#FFFFFF",
//   backgroundCard: "#fafafa",
// };

export const TACHYONS_CONFIG = {
  rem: REM_SIZE,
  colors: {
    palette: COLORS,
  },
};

export const HTML_STYLES = {
  body: {
    color: COLORS.textSecondary,
    fontSize: REM_SIZE,
  },
};
