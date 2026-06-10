import { auth, db } from '@/services/firebase/config';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, PixelRatio, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Sidebar from '@/components/SideBar';
import { useTheme } from "@/context/ThemeContext";
import BottomNavbar from '../../components/BottomNavBar';
import CategoryBreakdown from '../../components/CategoryBreakdown';
import Header from '../../components/Header';
import LeaveButton from '../../components/LeaveButton';
import NoTeamCard from '../../components/NoTeamCard';
import StatCard from '../../components/StatCard';
import TeamCard from '../../components/TeamCard';
import TeamCodeCard from '../../components/TeamCodeCard';
import TeamMembersCard from '../../components/TeamMembersCard';
import TeamProgressChart from '../../components/TeamProgressChart';
import { getAvatarSource } from '../../data/avatarData';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const hp = (p: number) => PixelRatio.roundToNearestPixel((height * p) / 100);
const rf = (s: number) => Math.round(PixelRatio.roundToNearestPixel((width / 390) * s));

export default function Team() {
  const { isDark, theme } = useTheme();
  const [hasTeam, setHasTeam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) { setLoading(false); return; }
    let unsubscribeTeam: (() => void) | null = null;
    const unsubscribeUser = onSnapshot(doc(db, 'users', uid), (userSnapshot) => {
      if (!userSnapshot.exists() || !userSnapshot.data()?.teamID) {
        setHasTeam(false); setTeamData(null); setLoading(false);
        if (unsubscribeTeam) unsubscribeTeam();
        return;
      }
      setHasTeam(true);
      if (unsubscribeTeam) unsubscribeTeam();
      unsubscribeTeam = onSnapshot(doc(db, 'teams', userSnapshot.data().teamID), (teamSnapshot) => {
        if (teamSnapshot.exists()) setTeamData({ id: teamSnapshot.id, ...teamSnapshot.data() });
        setLoading(false);
      });
    });
    return () => { unsubscribeUser(); if (unsubscribeTeam) unsubscribeTeam(); };
  }, []);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.teamBackground,
        }}
      />
    );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.teamBackground,
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(22) }}>
        {hasTeam && (
          <ImageBackground
            source={theme.teamHeroImage}
            style={styles.topSection}
            imageStyle={{ transform: [{ scale: 1.14 }, { translateY: -80 }] }}
          >
            <View style={styles.overlay}>
              <Header
                onMenuPress={() => setIsSidebarOpen(true)}
                avatarSource={getAvatarSource(
                  auth.currentUser?.photoURL,
                  auth.currentUser?.uid
                )}
              />

              <View style={styles.titleContainer}>
                <View style={styles.titleRow}>
                  <MaskedView maskElement={<Text style={styles.title}>TEAM</Text>}>
                    <LinearGradient
                      colors={theme.teamTitleGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={[styles.title, styles.hiddenText]}>
                        TEAM
                      </Text>
                    </LinearGradient>
                  </MaskedView>

                  <Text
                    style={[
                      styles.star,
                      {
                        color: theme.teamStar,
                      },
                    ]}
                  >
                    ✦
                  </Text>        
                </View>

                <Text
                  style={[
                    styles.subtitle,
                    {
                      color: theme.teamSubtitle,
                    },
                  ]}
                >          
                  Tiny Explorers, Big Ideas
                </Text>
              </View>
            </View>

            <LinearGradient
              colors={theme.teamBottomGradient}
              locations={[0, 0.35, 0.6, 0.82, 1]}
              style={styles.gradient}
            />
          </ImageBackground>
        )}
        
        <View style={styles.content}>
          {hasTeam && teamData ? (
            <>
              <TeamCard 
                teamName={teamData.teamName || 'STEMM LAB'} 
                teamCode={teamData.teamCode} 
                totalPoints={teamData.totalPoints || 0} 
                rank={teamData.rank || 0} 
                memberCount={teamData.members?.length || 0} 
              />
              <TeamMembersCard />
              <TeamCodeCard teamCode={teamData.teamCode} />
              <View style={styles.statRow}>
                <StatCard icon="⭐" value={teamData.totalPoints || 0} label="Points" />
                <StatCard icon="🚀" value={teamData.totalActivitiesCompleted || 0} label="Missions" />
                <StatCard icon="⚡" value={`${teamData.averageCompletionTime || 0}m`} label="Avg Time" />
              </View>
              
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: theme.teamSectionTitle,
                  },
                ]}
              >
                Activity Progress
              </Text>
              <TeamProgressChart data={teamData.weeklyCompletions || { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }} />
              
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: theme.teamSectionTitle,
                  },
                ]}
              >
                Categories Breakdown
              </Text>
              <CategoryBreakdown data={teamData.categories || { Science: 0, Recycling: 0, Creativity: 0 }} />
              <LeaveButton />
            </>
          ) : (
            <View style={{ marginTop: hp(6) }}>
              <NoTeamCard />
            </View>
          )}
        </View>
      </ScrollView>
      
      {isSidebarOpen && (
        <View style={styles.sidebarOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setIsSidebarOpen(false)} />
          <View
            style={[
              styles.sidebarWrapper,
              {
                backgroundColor: theme.teamSidebarBackground,
                borderRightColor: theme.teamSidebarBorder,
              },
            ]}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </View>
        </View>
      )}
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  sidebarOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 },
  sidebarWrapper: { width: wp(60), height: '100%', borderRightWidth: 1 },
  container: { flex: 1 },
  topSection: { width: '100%', minHeight: hp(50), overflow: 'hidden' },
  overlay: { paddingHorizontal: wp(4), zIndex: 2, paddingTop: hp(1.5) },
  titleContainer: { marginTop: hp(10) },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: rf(20), fontFamily: 'Pixel', textShadowRadius: wp(2.5) },
  hiddenText: { opacity: 0 },
  star: { marginLeft: wp(1.5), fontSize: rf(24) },
  subtitle: { marginTop: hp(1.2), fontSize: rf(16), fontFamily: 'PixelOperator' },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: hp(25),
    zIndex: 1,
  },
  content: { paddingHorizontal: wp(4) },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(2) },
  sectionTitle: { fontSize: rf(16), marginTop: hp(3), marginBottom: hp(1.5), fontFamily: 'PixelBold' },
});