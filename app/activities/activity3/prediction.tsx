import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
    Fan,
    Lightbulb,
    MessageCircle
} from 'lucide-react-native';
import { useState } from 'react';
import {
    Dimensions,
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import ExitButton from '@/components/activity/ExitButton';
import ExperimentHero from '@/components/activity/ExperimentHero';
import InfoModal from '@/components/activity/InfoModal';

import { activities } from '@/data/activities';

type ExperimentResult = {
    stage: string;
    dropTime: number;
    firstHitTime: string;
    stopMovingTime: string;
    velocity: number;
    acceleration: number;
    gForce: number;
    dropHeight: number;
    objectWeight: number;
    inTarget: boolean | null;
    bounced: boolean | null;
    impactForce: string;
    videoUri?: string;
    videoURL?: string;
}

const activity = activities.activity3;

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
    PixelRatio.roundToNearestPixel(
        (width * percentage) / 100
    );

const rf = (size: number) => {
    const scale = width / 390;
    return Math.round(
        PixelRatio.roundToNearestPixel(
            size * scale
        )
    );
};

const hp = (percentage: number) =>
    PixelRatio.roundToNearestPixel(
        (height * percentage) / 100
    );

const PREDICTION_OPTIONS = [
    {
        id: 0,
        title: "DESIGN 1",
        value: "Design 1"
    },
    {
        id: 1,
        title: "DESIGN 2",
        value: "Design 2"
    },
    {
        id: 2,
        title: "DESIGN 3",
        value: "Design 3"
    },
];
export default function Activity1Prediction() {
    const [showInfo, setShowInfo] = useState(false);
    const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);

    const handleSendAnswer = () => {
        if (selectedPrediction !== null) {
            const predictionValue = PREDICTION_OPTIONS[selectedPrediction].value;
            router.push({
                pathname: '/activities/activity3/experiment',
                params: { prediction: predictionValue }
            });
        }
    };

    return (
        <LinearGradient
            colors={[
                '#0B0820', 
                '#14103A', 
                '#1D1854',
                '#26216D',
                '#312C88',
                '#3A35A3',
            ]}
            locations={[0, 0.50, 0.75, 0.88, 0.94, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <TouchableOpacity
                    style={styles.infoButton}
                    onPress={() => setShowInfo(true)}
                >
                    <Image
                        source={require('@/assets/images/info-icon.png')}
                        style={styles.infoIcon}
                    />
                </TouchableOpacity>

<ExperimentHero
    activityID={3}
    title={activity.title}
    image={require('@/assets/images/fan.png')}
    imageStyle={{
        width: wp(40),
        height: hp(20),
        right: -wp(7),
        top: hp(-2),
    }}
    description={
        <Text style={styles.heroDescription}>
            Before starting the experiment, predict which
            <Text style={{ color: '#FF6BCB' }}>
                {" "}fan design
            </Text>
            {" "}will make the paper bend the most.
        </Text>
    }
/>

                <LinearGradient
                    colors={['#261B4D', '#1A123D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.whyBox}
                >
                    <View style={styles.whyIconWrapper}>
                        <Lightbulb size={rf(32)} color="#FFD94E" />
                    </View>
                    <View style={styles.whyTextContainer}>
                        <Text style={styles.whyTitle}>Why make a prediction?</Text>
                        <Text style={styles.whyDescription}>
                            Predictions help you think like a scientist! You'll test your idea and see if you're right.
                        </Text>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={['#161042', '#080427']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.predictionContainer}
                >
                    <MaskedView
                        maskElement={
                            <Text style={styles.predictionTitle}>PREDICTIONS ✦</Text>
                        }
                    >
                        <LinearGradient
                            colors={['#FF6097', '#B336FF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={[styles.predictionTitle, { opacity: 0 }]}>PREDICTIONS ★</Text>
                        </LinearGradient>
                    </MaskedView>
                    
<Text style={styles.predictionSubtitle}>
    Which fan design do you think
</Text>

<Text style={styles.highlightQuestion}>
    will bend the paper the most?
</Text>

                    <View style={styles.cardList}>
                        {/* Card 1: Clapping */}
                        <TouchableOpacity
                            style={[
                                styles.predictionCard,
                                selectedPrediction === 0 && styles.selectedCardRed,
                            ]}
                            onPress={() => setSelectedPrediction(0)}
                        >
                            <LinearGradient
                                colors={selectedPrediction === 0 ? ['#5E2036', '#330D1B'] : ['#3D1B27', '#210811']}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.iconWrapper}>
<Fan size={rf(32)} color="#FF6097" />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitle}>DESIGN 1</Text>                                           
                                    <Text style={styles.cardDescription}>
Small folded paper fan with narrow folds.
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Card 2: Dropping Object */}
                        <TouchableOpacity
                            style={[
                                styles.predictionCard,
                                selectedPrediction === 1 && styles.selectedCardYellow,
                            ]}
                            onPress={() => setSelectedPrediction(1)}
                        >
                            <LinearGradient
                                colors={selectedPrediction === 1 ? ['#5E4120', '#33210D'] : ['#3D2B16', '#21160B']}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.iconWrapper}>
<Fan size={rf(32)} color="#FFD94E" />                   
             </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitle}>DESIGN 2</Text>
                                    <Text style={styles.cardDescription}>
Wide folded paper fan with larger air surface.
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Card 3: Stomping Foot */}
                        <TouchableOpacity
                            style={[
                                styles.predictionCard,
                                selectedPrediction === 2 && styles.selectedCardGreen,
                            ]}
                            onPress={() => setSelectedPrediction(2)}
                        >
                            <LinearGradient
                                colors={selectedPrediction === 2 ? ['#205E4C', '#0D3328'] : ['#163D33', '#0B211A']}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.iconWrapper}>
<Fan size={rf(32)} color="#00E676" />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitle}>DESIGN 3</Text>
                                    <Text style={styles.cardDescription}>
Flat paper fan with no folds.
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Card 4: Talking */}
                        <TouchableOpacity
                            style={[
                                styles.predictionCard,
                                selectedPrediction === 3 && styles.selectedCardPurple,
                            ]}
                            onPress={() => setSelectedPrediction(3)}
                        >
                            <LinearGradient
                                colors={selectedPrediction === 3 ? ['#3B2A6E', '#1D1340'] : ['#261B4D', '#120B26']}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.iconWrapper}>
                                    <MessageCircle size={rf(32)} color="#B336FF" />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitle}>TALKING</Text>
                                    <Text style={styles.cardDescription}>
                                        Speaking continuously creates a steady level of sound.
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonActionRow}>
                        <TouchableOpacity
                            style={[
                                styles.sendButtonBase,
                                selectedPrediction === null && styles.sendButtonDisabled
                            ]}
                            disabled={selectedPrediction === null}
                            onPress={handleSendAnswer}
                        >
                            <LinearGradient
                                colors={selectedPrediction === null ? ['#3A35A3', '#3A35A3'] : ['#FFB6D9', '#9C4DFF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.sendButtonGradient}
                            >
                                <Text style={styles.sendButtonText}>SEND ANSWER</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                <ExitButton onPress={() => router.back()} />
            </ScrollView>

            <InfoModal
                visible={showInfo}
                title="HOW TO COMPLETE THIS ACTIVITY"
                instructions={[
                    'Place the object at the drop height.',
                    'Press Start Recording.',
                    'Drop the object.',
                    'Press Stop Recording.',
                    'Review the recording.',
                    'Determine the first hit time.',
                    'Determine the stop moving time.',
                    'Save Iteration.',
                ]}
                onClose={() => setShowInfo(false)}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingTop: hp(8),
        paddingBottom: hp(5),
    },
    infoIcon: {
        width: rf(34),
        height: rf(34),
        resizeMode: 'contain',
    },
    infoButton: {
        position: 'absolute',
        top: hp(11),
        right: wp(6),
        zIndex: 999,
    },
    predictionContainer: {
        marginHorizontal: wp(6),
        borderRadius: rf(22),
        borderWidth: 1.5,
        borderColor: '#7D5AC7',
        padding: wp(5),
        shadowColor: '#8A75FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 12,
    },
    predictionTitle: {
        fontFamily: 'PixelBold',
        fontSize: rf(34),
        textAlign: 'center',
    },
    highlightQuestion: {
        color: '#FF6BCB',
        fontFamily: 'PixelBold',
        fontSize: rf(19),
        textAlign: 'center',
        marginTop: -hp(0.5),
        marginBottom: hp(2.5),
    },
    predictionSubtitle: {
        fontFamily: 'PixelOperator',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: rf(19),
        marginTop: hp(1.5),
        marginBottom: 2,
        lineHeight: rf(22),
    },
    whyBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(4),
        marginHorizontal: wp(6),
        marginBottom: hp(3),
        marginTop: hp(2),
        borderRadius: rf(16),
        borderWidth: 1.5,
        borderColor: '#5B49D6',
        shadowColor: '#8A75FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    whyIconWrapper: {
        width: rf(50),
        height: rf(50),
        borderRadius: rf(25),
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4),
    },
    whyTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    whyTitle: {
        fontFamily: 'PixelBold',
        color: '#FFD94E',
        fontSize: rf(15),
        marginBottom: hp(0.5),
    },
    whyDescription: {
        fontFamily: 'PixelOperator',
        color: '#FFFFFF',
        fontSize: rf(14),
        lineHeight: rf(15),
    },
    cardList: {
        flexDirection: 'column',
        gap: hp(1.5),
    },
    predictionCard: {
        width: '100%',
        borderRadius: rf(18),
        borderWidth: 1.5,
        borderColor: '#463D83',
        overflow: 'hidden',
    },
    selectedCardRed: {
        borderColor: '#FF6097',
        shadowColor: '#FF6097',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    selectedCardYellow: {
        borderColor: '#FFD94E',
        shadowColor: '#FFD94E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    selectedCardGreen: {
        borderColor: '#00E676',
        shadowColor: '#00E676',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    selectedCardPurple: {
        borderColor: '#B336FF',
        shadowColor: '#B336FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    cardGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(4),
        minHeight: hp(10),
    },
    iconWrapper: {
        width: rf(50),
        height: rf(50),
        borderRadius: rf(25),
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4),
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTitle: {
        fontFamily: 'PixelBold',
        color: '#FFFFFF',
        fontSize: rf(17),
        marginBottom: hp(0.5),
    },
    cardDescription: {
        fontFamily: 'PixelOperator',
        color: '#CFCFE8',
        fontSize: rf(15),
        lineHeight: rf(16),
    },
    buttonActionRow: {
        marginTop: hp(3),
        alignItems: 'center',
    },
    sendButtonBase: {
        width: '100%',
        height: hp(6.5),
        borderRadius: rf(16),
        overflow: 'hidden',
    },
    sendButtonGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        opacity: 0.6,
    },
    sendButtonText: {
        color: 'white',
        fontFamily: 'Pixel',
        fontSize: rf(15),
    },
    heroDescription: {
        color: '#FFFFFF',
        fontSize: rf(15),
        fontFamily: 'PixelOperator',
        lineHeight: rf(22),
        width: rf(252)
    },
});