import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, PixelRatio, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ExitButton from "@/components/activity/ExitButton";
import LocationBreakdownCard from "@/components/activity/LocationBreakdownCard";
import NoiseGraph from "@/components/activity/NoiseGraph";
import PointsEarnedCard from "@/components/activity/PointsEarnedCard";
import SoundRiskCard from "@/components/activity/SoundRiskCard";
import SoundSummaryCard from "@/components/activity/SoundSummaryCard";

import { db } from "@/services/firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const { width, height } = Dimensions.get("window");
const wp = (p: number) => PixelRatio.roundToNearestPixel(width * p / 100);
const hp = (p: number) => PixelRatio.roundToNearestPixel(height * p / 100);
const rf = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * (width / 390)));

export default function Activity2Results() {
    const params = useLocalSearchParams();
    const activityID = Number(params.activityID);
    const sessionID = params.sessionID;

    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false); // Added missing state
    const [session, setSession] = useState<any>(null);
    const [locations, setLocations] = useState<any[]>([]);
    const [iterations, setIterations] = useState<any[]>([]);
    const [stats, setStats] = useState({
        average: 0,
        highest: 0,
        totalLocations: 0,
        experimentTime: 0,
        risk: "LOW",
        loudestLocation: "",
        totalPoints: 0,
    });

    useEffect(() => {
        if (sessionID) loadResults();
    }, [sessionID]);

    async function loadResults() {
        try {
            setLoading(true);
            const sessionSnap = await getDoc(doc(db, "sessions", String(sessionID)));
            if (sessionSnap.exists()) setSession(sessionSnap.data());

            const locationSnap = await getDocs(collection(db, "sessions", String(sessionID), "locations"));
            const locationList: any[] = [];
            const iterationList: any[] = [];

            for (const location of locationSnap.docs) {
                locationList.push({ id: location.id, ...location.data() });
                const iterationSnap = await getDocs(collection(db, "sessions", String(sessionID), "locations", location.id, "iterations"));
                
                iterationSnap.forEach(iter => {
                    iterationList.push({
                        locationID: location.id,
                        locationName: location.data().name,
                        ...iter.data()
                    });
                });
            }

            setLocations(locationList);
            setIterations(iterationList);
            
            if (sessionSnap.exists()) {
                calculateStatistics(sessionSnap.data(), locationList, iterationList);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    function calculateStatistics(sessionData: any, locationData: any[], iterationData: any[]) {
        if (iterationData.length === 0) return;
        let total = 0;
        let highest = 0;
        let loudestLocation = "";

        iterationData.forEach(item => {
            const dbVal = item.data?.averageDecibel ?? 0;
            total += dbVal;
            if (dbVal > highest) {
                highest = dbVal;
                loudestLocation = item.locationName;
            }
        });

        const average = total / iterationData.length;
        let points = average < 50 ? 100 : average < 70 ? 80 : average < 90 ? 60 : 40;
        
        let timeVal = sessionData?.experimentTime;
        if (timeVal && typeof timeVal === 'object' && 'seconds' in timeVal) {
            timeVal = timeVal.seconds;
        }

        setStats({
            average: Number(average.toFixed(1)),
            highest: Number(highest.toFixed(1)),
            totalLocations: locationData.length,
            experimentTime: timeVal ? Number(timeVal) : 0,
            risk: average < 60 ? "LOW" : average < 80 ? "MEDIUM" : "HIGH",
            loudestLocation,
            totalPoints: points,
        });
    }

    if (loading) {
        return (
            <LinearGradient colors={["#0B0820", "#14103A", "#1D1854"]} style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFD94E" />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={["#0B0820", "#14103A", "#1D1854", "#312C88"]} style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerTitle}>RESULTS</Text>
                    <View style={styles.neonDivider} />
                </View>

                <View style={styles.cardWrapper}>
                    <PointsEarnedCard points={stats.totalPoints} />
                </View>
                <View style={styles.cardWrapper}>
                    <SoundSummaryCard stats={stats} />
                </View>
                <View style={styles.cardWrapper}>
                    <SoundRiskCard highest={stats.highest} risk={stats.risk} />
                </View>
                <View style={styles.cardWrapper}>
                    <NoiseGraph iterations={iterations} />
                </View>
                <View style={styles.cardWrapper}>
                    <LocationBreakdownCard locations={locations} iterations={iterations} />
                </View>
                
                <View style={styles.buttonSpacing}>
                    <ExitButton onPress={() => router.replace("/homescreen")} />
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, isSaving && { opacity: 0.7 }]}
                    onPress={() => 
                        router.push({
                            pathname: '/activities/activity2/feedback',
                            params: {
                                activityID,
                                sessionID: sessionID,
                                pointsEarned: stats.totalPoints,
                            },
                        })
                    }
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 10 }} />
                            <Text style={styles.saveButtonText}>SAVING RESULTS...</Text>
                        </View>
                    ) : (
                        <Text style={styles.saveButtonText}>SAVE & REFLECT</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    content: { paddingTop: hp(4), paddingBottom: hp(5), paddingHorizontal: wp(4) },
    headerWrapper: { alignItems: "center", marginBottom: hp(3), marginTop: hp(2) },
    headerTitle: { color: "#FFE95B", fontFamily: "PixelBold", fontSize: rf(32), letterSpacing: 2 },
    neonDivider: { marginTop: hp(1.5), width: wp(50), height: 3, backgroundColor: "#FFD94E", borderRadius: 2 },
    cardWrapper: { marginBottom: hp(2.5), borderRadius: rf(20), elevation: 6 },
    buttonSpacing: { marginTop: hp(3), alignItems: "center" },
    saveButton: {
        backgroundColor: "#4B53A3",
        padding: 16,
        borderRadius: 15,
        alignItems: "center",
        marginTop: hp(2),
        borderWidth: 2,
        borderColor: "#FFD94E"
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontFamily: "Pixel",
        fontSize: rf(14)
    }
});