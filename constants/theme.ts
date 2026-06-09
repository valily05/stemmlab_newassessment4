/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
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
