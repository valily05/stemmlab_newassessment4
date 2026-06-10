/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
type GradientColors = readonly [
  string,
  string,
  ...string[]
];

export const DarkTheme = {
  background: "#07021B",

  surface: "#130C36",
  card: "#0D0824",

  border: "#301E6A",
  divider: "rgba(255,255,255,0.1)",

  text: "#FFFFFF",
  secondaryText: "#B7B8D0",
  placeholder: "#FFFFFF88",

  primary: "#A970FF",
  accent: "#EC588C",

  heroSmall: "#FFFFFF",
  heroDesc: "#FFFFFF",

  heroGradient: [
    "#A061F5",
    "#E879C6",
    "#C95A9E",
  ],

  heroGlow: "#9C4077",
  heroStarGlow: "#FF8BD6",

  headerTitle: "#FFFFFF",
  headerSubtitle: "#DDD6FE",
  activityTitle: "#FFFFFF",
activityViewAll: "#A970FF",

swipeHintBackground: "rgba(255,255,255,0.85)",
swipeHintArrow: "#894FD9",
streakGradient: [
  "#0A041D",
  "#160734",
  "#220A4D",
  "#160734",
  "#0A041D",
]as GradientColors,

streakBorder: "rgba(170,120,255,0.65)",

streakShadow: "#7058FF",

streakTitle: "#FFFFFF",
streakSubtitle: "#E7D9FF",

streakCircle: "#190038",
streakCircleBorder: "#7A2DFF",

streakCompleted: "#8426FF",
streakCompletedBorder: "#A65CFF",

streakCurrent: "#FF8A65",
streakCurrentBorder: "#FFD84D",

streakLine: "#7A2DFF",

streakText: "#FFFFFF",

streakPoints: "#FFFFFF",
streakPointsLabel: "#D7C7FF",

streakFooter: "#FFFFFF",

lockedIconBackground: "rgba(122,45,255,0.15)",
lockedIconBorder: "rgba(170,120,255,0.45)",
lockedIconColor: "#B882FF",
bannerTitle: "#FACC15",
bannerDescription: "#E9D5FF",

bannerShadow: "#8B5CF6",

bannerBackground: require("../assets/images/image 112.png"),
};export const LightTheme = {
  background: "#F8F6FF",

  surface: "#FFFFFF",
  card: "#FFFFFF",

  border: "#D9D0FF",
  divider: "#DDD6FE",

  text: "#1F2937",
  secondaryText: "#6B7280",
  placeholder: "#6B7280",

  primary: "#8B5CF6",
  accent: "#EC72C9",

  heroSmall: "#6E7396",
  heroDesc: "#747A99",

  heroGradient: [
    "#BDA6FF",
    "#A88BFF",
    "#D99BFF",
  ],

  heroGlow: "rgba(201,132,255,0.35)",
  heroStarGlow: "rgba(236,114,201,0.35)",

  headerTitle: "#8B5CF6",
  headerSubtitle: "#6E7396",
  activityTitle: "#717985",
activityViewAll: "#8B5CF6",

swipeHintBackground: "#FFFFFF",
swipeHintArrow: "#8B5CF6",
streakGradient: [
  "#FFFFFF",
  "#F8F6FF",
  "#F2EEFF",
  "#F8F6FF",
  "#FFFFFF",
] as GradientColors,

streakBorder: "#D9D0FF",

streakShadow: "rgba(139,92,246,0.25)",

streakTitle: "#606770",
streakSubtitle: "#6B7280",

streakCircle: "#FFFFFF",
streakCircleBorder: "#C4B5FD",

streakCompleted: "#8B5CF6",
streakCompletedBorder: "#A78BFA",

streakCurrent: "#EC72C9",
streakCurrentBorder: "#FBBF24",

streakLine: "#D9D0FF",

streakText: "#374151",

streakPoints: "#8B5CF6",
streakPointsLabel: "#6B7280",

streakFooter: "#374151",

lockedIconBackground: "#F4EEFF",
lockedIconBorder: "#D9D0FF",
lockedIconColor: "#8B5CF6",
bannerTitle: "#f3d77a",

bannerDescription: "#5B5B7A",

bannerShadow: "#C084FC",

bannerBackground: require("../assets/images/image 112 Light.png"),
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
