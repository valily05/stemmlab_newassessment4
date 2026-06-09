import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";

import {
    Dimensions,
    Image,
    ImageBackground,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const { width, height } = Dimensions.get("window");

const wp = (p: number) =>
  PixelRatio.roundToNearestPixel((width * p) / 100);

const hp = (p: number) =>
  PixelRatio.roundToNearestPixel((height * p) / 100);

const fp = (s: number) =>
  PixelRatio.roundToNearestPixel((width / 430) * s);

export default function CreateTeamPage() {
  const { theme, isDark } = useTheme();

  const [teamName, setTeamName] = useState("");

  const teamCode = useMemo(() => {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "STEM";

    for (let i = 0; i < 6; i++) {
      code +=
        chars[
          Math.floor(Math.random() * chars.length)
        ];
    }

    return code;
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ImageBackground
        source={
          isDark
            ? require("../assets/images/spacebg1.png")
            : require("../assets/images/spacebg1_light.png")
        }
        resizeMode="cover"
        style={styles.bg}
      >
        <LinearGradient
          colors={
            isDark
              ? [
                  "rgba(4,6,27,0)",
                  "rgba(4,6,27,.4)",
                  "#04061B",
                ]
              : [
                  "rgba(255,255,255,0)",
                  "rgba(255,255,255,.55)",
                  "#F8F6FF",
                ]
          }
          style={StyleSheet.absoluteFillObject}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* HEADER */}

          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Image
                source={require("../assets/images/backbtn.png")}
                style={styles.back}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.pageTitle,
                {
                  color: theme.text,
                },
              ]}
            >
              ✦ CREATE TEAM ✦
            </Text>

            <View
              style={{
                width: wp(11),
              }}
            />
          </View>

          {/* HERO */}

          <View style={styles.hero}>
            <View>
              <Image
                source={require("../assets/images/purpleMoon.png")}
                style={styles.moon}
              />

              <Image
                source={require("../assets/images/bunnyTeam.png")}
                style={styles.bunny}
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={[
                  styles.heroTitle,
                  {
                    color: theme.primary,
                  },
                ]}
              >
                CREATE YOUR SQUAD
              </Text>

              <Text
                style={[
                  styles.heroDesc,
                  {
                    color: theme.secondaryText,
                  },
                ]}
              >
                Create a team and invite your
                friends to complete activities,
                earn points and climb the
                leaderboard together!
              </Text>
            </View>
          </View>

          {/* CARD */}

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.cardTitle,
                {
                  color: theme.text,
                },
              ]}
            >
              ✦ TEAM INFORMATION
            </Text>

            {/* TEAM NAME */}

            <Text
              style={[
                styles.label,
                {
                  color: theme.text,
                },
              ]}
            >
              TEAM NAME
            </Text>

            <TextInput
              value={teamName}
              onChangeText={setTeamName}
              placeholder="Enter Team name"
              placeholderTextColor={
                theme.placeholder
              }
              style={[
                styles.input,
                {
                  color: theme.text,
                  borderColor: theme.border,
                  backgroundColor:
                    theme.background,
                },
              ]}
            />

            {/* TEAM ID */}

            <Text
              style={[
                styles.label,
                {
                  marginTop: hp(2),
                  color: theme.text,
                },
              ]}
            >
              TEAM ID (SHARE WITH MEMBERS)
            </Text>

            <View style={styles.codeRow}>
              <View
                style={[
                  styles.codeBox,
                  {
                    borderColor: theme.border,
                    backgroundColor:
                      theme.background,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.code,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  {teamCode}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.copyBtn,
                  {
                    backgroundColor:
                      theme.primary,
                  },
                ]}
              >
                <Image
                  source={require("../assets/images/copy.png")}
                  style={styles.copy}
                />
              </TouchableOpacity>
            </View>

            {/* TIP */}

            <View
              style={[
                styles.tipBox,
                {
                  borderColor: theme.primary,
                },
              ]}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={styles.tipTitle}
                >
                  ⭐ TIP
                </Text>

                <Text
                  style={[
                    styles.tipText,
                    {
                      color:
                        theme.secondaryText,
                    },
                  ]}
                >
                  Share your Team ID with
                  classmates so they can join
                  your team. You can add up to
                  6 members.
                </Text>
              </View>

              <Image
                source={require("../assets/images/planet.png")}
                style={styles.planet}
              />
            </View>
          </View>

          {/* BUTTON */}

          <TouchableOpacity
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={
                isDark
                  ? [
                      "#8F5BFF",
                      "#C067FF",
                    ]
                  : [
                      "#C9A8FF",
                      "#A970FF",
                    ]
              }
              style={styles.createBtn}
            >
              <Text
                style={styles.createText}
              >
                CREATE TEAM
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bg: {
    flex: 1,
  },

  content: {
    paddingHorizontal: wp(6),
    paddingTop: hp(7),
    paddingBottom: hp(12),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    width: wp(11),
    height: wp(11),
    resizeMode: "contain",
  },

  pageTitle: {
    fontFamily: "Pixel",
    fontSize: fp(18),
    letterSpacing: 1,
  },

  hero: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(3),
    marginBottom: hp(3),
  },

  moon: {
    width: wp(34),
    height: wp(18),
    resizeMode: "contain",
  },

  bunny: {
    width: wp(25),
    height: wp(25),
    resizeMode: "contain",
    position: "absolute",
    left: wp(4),
    top: -wp(14),
  },

  heroTitle: {
    fontFamily: "Pixel",
    fontSize: fp(18),
    marginBottom: hp(1),
  },

  heroDesc: {
    fontFamily: "PixelOperator",
    fontSize: fp(14),
    lineHeight: fp(20),
  },

  card: {
    borderWidth: 2,
    borderRadius: wp(5),
    padding: wp(5),
  },

  cardTitle: {
    fontFamily: "PixelBold",
    fontSize: fp(18),
    marginBottom: hp(2),
  },

  label: {
    fontFamily: "PixelOperator",
    fontSize: fp(14),
    marginBottom: hp(1),
  },

  input: {
    borderWidth: 2,
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    height: hp(6),
    fontFamily: "PixelOperator",
    fontSize: fp(16),
  },

  codeRow: {
    flexDirection: "row",
    marginTop: hp(.5),
  },

  codeBox: {
    flex: 1,
    height: hp(6),
    borderWidth: 2,
    borderRadius: wp(3),
    justifyContent: "center",
    alignItems: "center",
  },

  code: {
    fontFamily: "Pixel",
    fontSize: fp(22),
  },

  copyBtn: {
    width: hp(6),
    height: hp(6),
    borderRadius: wp(3),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp(3),
  },

  copy: {
    width: wp(6),
    height: wp(6),
    resizeMode: "contain",
  },

  tipBox: {
    marginTop: hp(3),
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: wp(3),
    padding: wp(3),
    flexDirection: "row",
    alignItems: "center",
  },

  tipTitle: {
    color: "#FFD54F",
    fontFamily: "PixelBold",
    fontSize: fp(16),
    marginBottom: hp(.7),
  },

  tipText: {
    fontFamily: "PixelOperator",
    fontSize: fp(13),
    lineHeight: fp(18),
  },

  planet: {
    width: wp(18),
    height: wp(18),
    resizeMode: "contain",
    marginLeft: wp(2),
  },

  createBtn: {
    marginTop: hp(5),
    height: hp(7),
    borderRadius: wp(4),
    justifyContent: "center",
    alignItems: "center",
  },

  createText: {
    color: "#FFF",
    fontFamily: "PixelBold",
    fontSize: fp(22),
    letterSpacing: 1,
  },
});