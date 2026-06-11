import { Platform } from 'react-native';

export type GradientColors = readonly [string, string, ...string[]];

export interface Theme {
  sidebarGradient: GradientColors;
  sidebarTitle: string;
  sidebarSubtitle: string;
  sidebarText: string;
  sidebarDivider: string;
  sidebarToggleBg: string;
  logoutBg: string;
  logoutBorder: string;
  logoutText: string;
  switchOnBg: string;
  switchOffBg: string;
  knobOnColor: string;
  knobOffColor: string;
  noTeamFeatureBorder: string;
  noTeamFeatureBackground: string;
  noTeamDash: string;
  noTeamSubtitle: string;
  noTeamFeatureText: string;
  noTeamReadyText: string;
  noTeamReadyStar: string;
  noTeamCodeBox: string;
  noTeamCodeBorder: string;
  noTeamCodeDigit: string;
  noTeamJoinGradient: GradientColors;
  noTeamJoinText: string;
  noTeamDivider: string;
  noTeamOr: string;
  noTeamCreateGradient: GradientColors;
  teamBackground: string;
  teamSidebarBackground: string;
  teamSidebarBorder: string;
  teamHeroImage: any;
  teamTitleGradient: GradientColors;
  teamTitleShadow: string;
  teamStar: string;
  teamSubtitle: string;
  teamBottomGradient: GradientColors;
  teamSectionTitle: string;
  background: string;
  surface: string;
  card: string;
  border: string;
  divider: string;
  text: string;
  secondaryText: string;
  placeholder: string;
  primary: string;
  accent: string;
  heroSmall: string;
  heroDesc: string;
  heroGradient: string[];
  heroGlow: string;
  heroStarGlow: string;
  headerTitle: string;
  headerSubtitle: string;
  activityTitle: string;
  activityViewAll: string;
  swipeHintBackground: string;
  swipeHintArrow: string;
  streakGradient: GradientColors;
  streakBorder: string;
  streakShadow: string;
  streakTitle: string;
  streakSubtitle: string;
  streakCircle: string;
  streakCircleBorder: string;
  streakCompleted: string;
  streakCompletedBorder: string;
  streakCurrent: string;
  streakCurrentBorder: string;
  streakLine: string;
  streakText: string;
  streakPoints: string;
  streakPointsLabel: string;
  streakFooter: string;
  lockedIconBackground: string;
  lockedIconBorder: string;
  lockedIconColor: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerShadow: string;
  bannerBackground: any;
  activitiesBackground: string;
  activitiesHeroImage: any;
  activitiesTitleGradient: GradientColors;
  activitiesTitleShadow: string;
  activitiesStar: string;
  activitiesStarGlow: string;
  activitiesSubtitle: string;
  activitiesBottomGradient: GradientColors;
  activitiesSidebarBackground: string;
  activitiesSidebarBorder: string;
  activityCard: string;
  activityBorder: string;
  activityShadow: string;
  activityCardGradient: GradientColors;
  activityDescription: string;
  activityStatBackground: string;
  activityStatText: string;
  activityButtonGradient: GradientColors;
  activityButtonDisabledGradient: GradientColors;
  activityButtonShadow: string;
  engineeringBorder: string;
  engineeringBackground: string;
  environmentBorder: string;
  environmentBackground: string;
  scienceBorder: string;
  scienceBackground: string;
  technologyBorder: string;
  technologyBackground: string;
  activityButtonText: string;
  activityEasy: string;
  activityMedium: string;
  activityHard: string;
  activityEasyIcon: string;
  activityMediumIcon: string;
  activityHardIcon: string;
  activeTabBackground: string;
  activeTabText: string;
  tabBackground: string;
  tabTextColor: string;
  // Fallbacks for dynamic styles if not defined inline
  cardWrapperBackground?: string;
  glassColors?: string[];
}

export const DarkTheme: Theme = {
  sidebarGradient: [
    '#07021B', 
    '#2E1065', 
    '#0F172A'
  ],
  sidebarTitle: "#FFFFFF",
  sidebarSubtitle: "#FFFFFF",
  sidebarText: "#FFFFFF",
  sidebarDivider: "rgba(255,255,255,0.08)",
  sidebarToggleBg: "rgba(255, 255, 255, 0.05)",
  logoutBg: "rgba(255, 77, 109, 0.15)",
  logoutBorder: "#FF4D6D",
  logoutText: "#FF4D6D",
  switchOnBg: '#0F2F4F',
  switchOffBg: '#FFEBB7',
  knobOnColor: '#47CFFF',
  knobOffColor: '#FFCB30',
  noTeamFeatureBorder: "#3E2A78",
  noTeamFeatureBackground: "#0D102E",
  noTeamDash: "#3E2A78",
  noTeamSubtitle: "#FFFFFF",
  noTeamFeatureText: "#FFFFFF",
  noTeamReadyText: "#FFFFFF",
  noTeamReadyStar: "#ED359D",
  noTeamCodeBox: "#1B1235",
  noTeamCodeBorder: "#6F42FF",
  noTeamCodeDigit: "#FFFFFF",
  noTeamJoinGradient: [
    "#5B21B6",
    "#DB2777",
  ],
  noTeamJoinText: "#FFFFFF",
  noTeamDivider: "#26344F",
  noTeamOr: "#7184A8",
  noTeamCreateGradient: [
    "#E879F9",
    "#A970FF",
    "#6D5CFF",
  ],
  teamBackground: "#07021B",
  teamSidebarBackground: "#07021B",
  teamSidebarBorder: "rgba(255,255,255,0.1)",
  teamHeroImage: require("../assets/images/teambg2.png"),
  teamTitleGradient: [
    "#A061F5",
    "#8B5CF6",
    "#5D398F",
  ],
  teamTitleShadow: "#C66CFF",
  teamStar: "#EC588C",
  teamSubtitle: "#FFFFFF",
  teamBottomGradient: [
    "rgba(4,6,27,0)",
    "rgba(4,6,27,0.45)",
    "rgba(4,6,27,0.85)",
    "rgba(4,6,27,0.99)",
    "#04061B",
  ],
  teamSectionTitle: "#B8A0FF",
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
  ],
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
  activitiesBackground: "#07021B",
  activitiesHeroImage: require("../assets/images/spaceships.png"),
  activitiesTitleGradient: [
    "#A061F5",
    "#8B5CF6",
    "#5D398F",
  ],
  activitiesTitleShadow: "#C66CFF",
  activitiesStar: "#EC588C",
  activitiesStarGlow: "#FF4FC3",
  activitiesSubtitle: "#FFFFFF",
  activitiesBottomGradient: [
    "rgba(4,6,27,0)",
    "rgba(4,6,27,0.35)",
    "rgba(4,6,27,0.75)",
    "rgba(4,6,27,0.96)",
    "#04061B",
  ],
  activitiesSidebarBackground: "#07021B",
  activitiesSidebarBorder: "rgba(255,255,255,0.10)",
  activityCard: "#12052F",
  activityBorder: "#7B4DFF",
  activityShadow: "#7B4DFF",
  activityCardGradient: [
    "#1B0F45",
    "#12052F",
    "#0D0422",
  ],
  activityDescription: "#D7CCFF",
  activityStatBackground: "#1C103D",
  activityStatText: "#F2E7FF",
  activityButtonGradient: [
    "#FF79C8",
    "#FF4FA4",
  ],
  activityButtonDisabledGradient: [
    "#666666",
    "#555555",
  ],
  activityButtonShadow: "#FF5CA8",
  engineeringBorder: "#F5730C",
  engineeringBackground: "#24153F",
  environmentBorder: "#60BB3F",
  environmentBackground: "#1A2E16",
  scienceBorder: "#59C8FF",
  scienceBackground: "#150F31",
  technologyBorder: "#D176FF",
  technologyBackground: "#150F31",
  activityButtonText: "#FFFFFF",
  activityEasy: "#6DFF7A",
  activityMedium: "#FFB84D",
  activityHard: "#FF5F5F",
  activityEasyIcon: "#6DFF7A",
  activityMediumIcon: "#FFB84D",
  activityHardIcon: "#FF5F5F",
  activeTabBackground: '#8B5CF6',
  activeTabText: '#FFFFFF',
  tabBackground: 'transparent',
  tabTextColor: '#FFFFFF',
};

export const LightTheme: Theme = {
  sidebarGradient: [
    '#F8F6FF', 
    '#E9DFFB', 
    '#FFFFFF'
  ],
  sidebarTitle: "#1F2937",
  sidebarSubtitle: "#5A5575",
  sidebarText: "#1F2937",
  sidebarDivider: "#E5E7EB",
  sidebarToggleBg: "rgba(0, 0, 0, 0.03)",
  logoutBg: "rgba(239, 68, 68, 0.1)",
  logoutBorder: "#EF4444",
  logoutText: "#EF4444",
  switchOnBg: '#312E81',
  switchOffBg: '#FEF3C7',
  knobOnColor: '#818CF8',
  knobOffColor: '#F59E0B',
  noTeamFeatureBorder: "#D9D0FF",
  noTeamFeatureBackground: "#FFFFFF",
  noTeamDash: "#D9D0FF",
  noTeamSubtitle: "#5B5B7A",
  noTeamFeatureText: "#5B5B7A",
  noTeamReadyText: "#4B5563",
  noTeamReadyStar: "#EC4899",
  noTeamCodeBox: "#F8F6FF",
  noTeamCodeBorder: "#A78BFA",
  noTeamCodeDigit: "#4B5563",
  noTeamJoinGradient: [
    "#EC72C9",
    "#A78BFA",
  ],
  noTeamJoinText: "#FFFFFF",
  noTeamDivider: "#E5E7EB",
  noTeamOr: "#6B7280",
  noTeamCreateGradient: [
    "#C084FC",
    "#A78BFA",
    "#8B5CF6",
  ],
  teamBackground: "#F8F6FF",
  teamSidebarBackground: "#FFFFFF",
  teamSidebarBorder: "#E9DFFB",
  teamHeroImage: require("../assets/images/teambg2_light.png"),
  teamTitleGradient: [
    "#8B5CF6",
    "#A855F7",
    "#EC4899",
  ],
  teamTitleShadow: "#C084FC",
  teamStar: "#EC4899",
  teamSubtitle: "#5A5575",
  teamBottomGradient: [
    "rgba(248,246,255,0)",
    "rgba(248,246,255,0.45)",
    "rgba(248,246,255,0.80)",
    "rgba(248,246,255,0.96)",
    "#F8F6FF",
  ],
  teamSectionTitle: "#8B5CF6",
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
  ],
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
  activitiesBackground: "#F8F6FF",
  activitiesHeroImage: require("../assets/images/spaceshipsLight.png"),
  activitiesTitleGradient: [
    "#8B5CF6",
    "#A855F7",
    "#EC4899",
  ],
  activitiesTitleShadow: "#C084FC",
  activitiesStar: "#EC4899",
  activitiesStarGlow: "#F472B6",
  activityButtonText: "#FFFFFF",
  activityEasy: "#22C55E",
  activityMedium: "#F59E0B",
  activityHard: "#EF4444",
  activityEasyIcon: "#22C55E",
  activityMediumIcon: "#F59E0B",
  activityHardIcon: "#EF4444",
  activitiesSubtitle: "#5A5575",
  activitiesBottomGradient: [
    "rgba(248,246,255,0)",
    "rgba(248,246,255,0.45)",
    "rgba(248,246,255,0.80)",
    "rgba(248,246,255,0.96)",
    "#F8F6FF",
  ],
  activitiesSidebarBackground: "#FFFFFF",
  activitiesSidebarBorder: "#E9DFFB",
  activityCard: "#FFFFFF",
  activityBorder: "#D7CCFF",
  activityShadow: "rgba(139,92,246,0.18)",
  activityCardGradient: [
    "#FFFFFF",
    "#FAF7FF",
    "#F3EEFF",
  ],
  activityDescription: "#6B7280",
  activityStatBackground: "#F7F3FF",
  activityStatText: "#4B5563",
  activityButtonGradient: [
    "#EC72C9",
    "#A78BFA",
  ],
  activityButtonDisabledGradient: [
    "#D6D3D1",
    "#C7C4C2",
  ],
  activityButtonShadow: "rgba(236,114,201,0.3)",
  engineeringBorder: "#F97316",
  engineeringBackground: "#FFF5E8",
  environmentBorder: "#22C55E",
  environmentBackground: "#ECFDF3",
  scienceBorder: "#38BDF8",
  scienceBackground: "#EEF8FF",
  technologyBorder: "#A855F7",
  technologyBackground: "#F7F0FF",
  activeTabBackground: '#6D28D9',
  activeTabText: '#FFFFFF',
  tabBackground: 'transparent',
  tabTextColor: '#111827',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
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