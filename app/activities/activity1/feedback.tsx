import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Rocket, Star } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  PixelRatio,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { Timestamp } from 'firebase/firestore';

import { activities } from '@/data/activities';
import { saveActivityFeedback } from '@/services/firebase/activityFeedbackService';
import { sendCompletionNotification } from '@/services/notifications/notificationService';

const activity = activities.activity1;

const { width, height } = Dimensions.get('window');

const wp = (p:number) =>
  PixelRatio.roundToNearestPixel(
    (width * p) / 100
  );

const hp = (p:number) =>
  PixelRatio.roundToNearestPixel(
    (height * p) / 100
  );

const rf = (size:number) => {
  const scale = width / 390;
  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};

export default function Activity1Feedback() {
  
  const scrollRef = useRef<ScrollView>(null);

  const [rating, setRating] = useState(0);
  const [learned, setLearned] = useState('');
  const [improvement, setImprovement] = useState('');

  const meteor1X = useRef(
    new Animated.Value(-300)
  ).current;
  const meteor2X = useRef(
    new Animated.Value(-600)
  ).current;
  const meteor3X = useRef(
    new Animated.Value(-900)
  ).current;
  const meteor4X = useRef(
    new Animated.Value(-1200)
  ).current;
  const meteor5X = useRef(
    new Animated.Value(-1500)
  ).current;
  const meteor6X = useRef(
    new Animated.Value(-1800)
  ).current;
  const meteor7X = useRef(
    new Animated.Value(-2100)
  ).current;
  const meteor8X = useRef(
    new Animated.Value(-2400)
  ).current;

  const {
    sessionID,
    pointsEarned,
  } = useLocalSearchParams();

  //console.log('activityName:', activityName);
  console.log('pointsEarned:', pointsEarned);

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        meteor1X,
        {
          toValue: width + 300,
          duration: 3800,
          useNativeDriver: true,
        }
      )
    ).start();

    Animated.loop(
      Animated.timing(
        meteor2X,
        {
          toValue: width + 300,
          duration: 5100,
          useNativeDriver: true,
        }
      )
    ).start();

    Animated.loop(
      Animated.timing(
        meteor3X,
        {
          toValue: width + 300,
          duration: 7600,
          useNativeDriver: true,
        }
      )
    ).start();

    Animated.loop(
      Animated.timing(
        meteor4X,
        {
          toValue: width + 300,
          duration: 4900,
          useNativeDriver: true,
        }
      )
    ).start();

    Animated.loop(
      Animated.timing(
        meteor5X,
        {
          toValue: width + 300,
          duration: 6500,
          useNativeDriver: true,
        }
      )
    ).start();

    Animated.loop(
      Animated.timing(
        meteor6X,
        {
          toValue: width + 300,
          duration: 8500,
          useNativeDriver: true,
        }
      )
    ).start();

    Animated.loop(
      Animated.timing(
        meteor7X,
        {
          toValue: width + 300,
          duration: 7200,
          useNativeDriver: true,
        }
      )
    ).start();

    Animated.loop(
      Animated.timing(
        meteor8X,
        {
          toValue: width + 300,
          duration: 9200,
          useNativeDriver: true,
        }
      )
    ).start();
  }, []);

  const normalizeText = (text:string) =>
    text.toLowerCase().replace(/[^a-z]/g,'');

  const containsBadWords = (text:string) => {
    const cleaned = normalizeText(text);

    const offensiveRoots = [
      'fuck','fck','fk','fak',
      'shit',
      'bitch',
      'gay',
    ];

    const containsOffensiveRoot =
      offensiveRoots.some(word =>
        cleaned.includes(word)
      );

    const bypassPatterns = [
      /f+u*c*k+/,
      /f+c*k+/,
      /f+x+c*k+/,
      /f+k+/,
      /s+h+i+t+/,
      /b+i+t+c+h+/,
    ];

    const containsBypass =
      bypassPatterns.some(pattern =>
        pattern.test(cleaned)
      );

    return (
      containsOffensiveRoot ||
      containsBypass
    );
  };

  const learnedWords =
    learned.trim()
      ? learned.trim().split(/\s+/).length
      : 0;

  const improvementWords =
    improvement.trim()
      ? improvement.trim().split(/\s+/).length
      : 0;

  const hasBadLanguage =
    containsBadWords(learned) ||
    containsBadWords(improvement);

  const canSubmit =
    learnedWords >= 10 &&
    improvementWords >= 10 &&
    !hasBadLanguage &&
    rating > 0;

  return (
    <LinearGradient
      colors={[
        '#0B0820',
        '#14103A',
        '#1D1854',
        '#26216D',
        '#312C88',
      ]}
      locations={[
        0,
        0.5,
        0.75,
        0.9,
        1,
      ]}
      style={styles.container}
    >
      <View style={styles.starsContainer}>
        <View style={[styles.star, styles.star1]} />
        <View style={[styles.star, styles.star2]} />
        <View style={[styles.star, styles.star3]} />
        <View style={[styles.star, styles.star4]} />
        <View style={[styles.star, styles.star5]} />
        <View style={[styles.star, styles.star6]} />
        <View style={[styles.star, styles.star7]} />
        <View style={[styles.star, styles.star8]} />
        <View style={[styles.star, styles.star9]} />
        <View style={[styles.star, styles.star10]} />
        <View style={[styles.star, styles.star11]} />
        <View style={[styles.star, styles.star12]} />
        <View style={[styles.star, styles.star13]} />
        <View style={[styles.star, styles.star14]} />
        <View style={[styles.star, styles.star15]} />
        <View style={[styles.star, styles.star16]} />
        <View style={[styles.star, styles.star17]} />
        <View style={[styles.star, styles.star18]} />
        <View style={[styles.star, styles.star19]} />
        <View style={[styles.star, styles.star20]} />

        <Animated.View
          style={[
            styles.meteor1,
            {
              transform:[
                {
                  translateX: meteor1X
                },
                {
                  translateY: meteor1X
                },
                {
                  rotate:'45deg'
                }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.4)',
              '#FFFFFF',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.meteorTail}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.meteor2,
            {
              transform:[
                {
                  translateX: meteor2X
                },
                {
                  translateY: meteor2X
                },
                {
                  rotate:'45deg'
                }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,214,51,0)',
              'rgba(255,214,51,0.4)',
              '#FFD633',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.meteorTail}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.meteor3,
            {
              transform:[
                {
                  translateX: meteor3X
                },
                {
                  translateY: meteor3X
                },
                {
                  rotate:'45deg'
                }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(200,109,255,0)',
              'rgba(200,109,255,0.4)',
              '#C86DFF',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.meteorTail}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.meteor4,
            {
              transform:[
                {
                  translateX: meteor4X
                },
                {
                  translateY: meteor4X
                },
                {
                  rotate:'45deg'
                }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(125,249,255,0)',
              'rgba(125,249,255,0.4)',
              '#7DF9FF',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.meteorTail}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.meteor5,
            {
              transform:[
                {
                  translateX: meteor5X
                },
                {
                  translateY: meteor5X
                },
                {
                  rotate:'45deg'
                }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,130,200,0)',
              'rgba(255,130,200,0.4)',
              '#FF82C8',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.meteorTail}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.meteor6,
            {
              transform:[
                {
                  translateX: meteor6X
                },
                {
                  translateY: meteor6X
                },
                {
                  rotate:'45deg'
                }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,170,0,0)',
              'rgba(255,170,0,0.4)',
              '#FFAA00',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.meteorTail}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.meteor7,
            {
              transform:[
                {
                  translateX: meteor7X
                },
                {
                  translateY: meteor7X
                },
                {
                  rotate:'45deg'
                }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.4)',
              '#FFFFFF',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.meteorTail}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.meteor8,
            {
              transform:[
                {
                  translateX: meteor8X
                },
                {
                  translateY: meteor8X
                },
                {
                  rotate:'45deg'
                }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,214,51,0)',
              'rgba(255,214,51,0.4)',
              '#FFD633',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.meteorTail}
          />
        </Animated.View>
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <ArrowLeft
            size={rf(24)}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          ACTIVITY FEEDBACK
        </Text>

        <View
          style={{ width: rf(24) }}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
      >
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.content
          }
        >
          <View style={styles.heroCard}>
            <View style={styles.rocketCircle}>
              <Rocket
                size={rf(45)}
                color="#FFD91C"
              />
            </View>

            <MaskedView
              maskElement={
                <Text style={styles.heroTitle}>
                  ACTIVITY COMPLETE
                </Text>
              }
            >
              <LinearGradient
                colors={[
                  '#FFF8D6',
                  '#FFD700',
                  '#F4B400',
                  '#FFF1A8',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={[
                    styles.heroTitle,
                    { opacity: 0 }
                  ]}
                >
                  ACTIVITY COMPLETE
                </Text>
              </LinearGradient>
            </MaskedView>

            <Text style={styles.heroText}>
              Great job completing {activity.title}.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              RATE THIS MISSION
            </Text>

            <View style={styles.starRow}>
              {[1,2,3,4,5].map(
                star => (
                  <TouchableOpacity
                    key={star}
                    onPress={() =>
                      setRating(star)
                    }
                  >
                    <Star
                      size={rf(42)}
                      color="#FFD633"
                      fill={
                        star <= rating
                          ? '#FFD633'
                          : 'transparent'
                      }
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.questionRow}>
              <Text style={styles.cardTitle}>
                WHAT DID YOU LIKE ABOUT THIS ACTIVITY?
              </Text>
            </View>
            <Text
              style={[
                styles.wordCounter,
                learnedWords >= 10 && {
                  color:'#7DFFAE',
                },
              ]}
            >
              {learnedWords}/10
            </Text>

            <BlurView
              intensity={25}
              tint="dark"
              style={styles.glassInput}
            >
              <TextInput
                multiline
                value={learned}
                onChangeText={setLearned}
                placeholder="Describe which part of the activity you like most..."
                placeholderTextColor="#C7C9E8"
                style={styles.input}
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollTo({
                      y: 200,
                      animated: true,
                    });
                  }, 250);
                }}
              />
            </BlurView>
          </View>
          
          <View style={styles.card}>
            <View style={styles.questionRow}>
              <Text style={styles.cardTitle}>
                WHAT DIFFICULTIES DID YOU EXPERIENCE?
              </Text>
            </View>

            <Text
              style={[
                styles.wordCounter,
                improvementWords >= 10 && {
                  color:'#7DFFAE',
                },
              ]}
            >
              {improvementWords}/10
            </Text>

            <BlurView
              intensity={25}
              tint="dark"
              style={styles.glassInput}
            >
              <TextInput
                multiline
                value={improvement}
                onChangeText={setImprovement}
                placeholder="What changes would you make to your next prototype?"
                placeholderTextColor="#C7C9E8"
                style={styles.input}
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollTo({
                      y: 420,
                      animated: true,
                    });
                  }, 250);
                }}
              />
            </BlurView>
          </View>

          {hasBadLanguage && (
            <Text style={styles.errorText}>
              Please remove inappropriate language before submitting.
            </Text>
          )}

          <TouchableOpacity
            disabled={!canSubmit}
            onPress={async () => {
              if(!canSubmit){
                return;
              }

await saveActivityFeedback(
  {
    sessionID: String(sessionID),
    activityID: 1,
    rating,
    whatDidYouLike: learned,
    whatDifficulties: improvement,
    submittedAt: Timestamp.now(),
  },
  Number(pointsEarned)
);

              await sendCompletionNotification(String(activity.title), Number(pointsEarned));//the score will be calculated

              // console.log({
              //   rating,
              //   learned,
              //   improvement,
              // });

              router.replace('/(tabs)/homescreen');
            }}
            style={[
              styles.submitButton,
              !canSubmit && {
                opacity:0.45,
              },
            ]}
          >
            <Text style={styles.submitText}>
              SUBMIT & RETURN HOME
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  header:{
    marginTop:hp(7),

    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    paddingHorizontal:wp(5),
  },

  title:{
    color:'#FFFFFF',
    fontSize:rf(18),
    fontFamily:'PixelBold',
  },

  content:{
    padding:wp(5),
    paddingBottom:hp(10),
  },

  heroCard:{
    borderRadius:rf(16),
    padding:rf(24),
    alignItems:'center',
    marginBottom:rf(20)
  },

  heroTitle:{
    color:'#FFD91C',
    fontSize:rf(19),
    fontFamily:'Pixel',
    width:rf(330),
    marginTop:hp(2),
  },

  questionRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    marginBottom:hp(2),
  },

  wordCounter: {
    backgroundColor: 'rgba(112, 128, 252, 0.15)',
    color: '#7080FC',

    fontSize: rf(14),
    fontFamily: 'PixelOperator',
    textAlign:'center',
    paddingHorizontal: rf(10),
    paddingVertical: rf(6),

    borderWidth: 1,
    borderColor: 'rgba(112, 128, 252, 0.3)',
    borderRadius: rf(14),

    marginTop: rf(-20),
    marginBottom: rf(10),
    width:rf(55)
  },

  heroText:{
    color:'#D8D8FF',
    textAlign:'center',

    marginTop:rf(14),
    fontSize:rf(15),
    fontFamily:'PixelOperator',
  },

  card:{
    backgroundColor:'rgba(255,255,255,0.04)',

    borderRadius:rf(16),
    borderWidth:1,
    borderColor:'rgba(255,255,255,0.08)',

    padding:rf(18),
    marginBottom:hp(2),
  },

  cardTitle:{
    color:'#FFFFFF',
    fontSize:rf(18),
    fontFamily:'PixelBold',
    marginBottom:hp(2),
  },

  starRow:{
    flexDirection:'row',
    justifyContent:'space-between',
  },

  errorText:{
    color:'#FF8080',
    fontSize:rf(13),
    fontFamily:'PixelOperator',
    textAlign:'center',
    marginBottom:hp(1),
  },

  glassInput:{
    height:hp(16),
    borderWidth:1.5,
    borderColor:'rgba(255,255,255,0.12)',
    backgroundColor:'rgba(255,255,255,0.05)',
  },

  input:{
    flex:1,
    padding:rf(16),
    color:'#FFFFFF',
    fontSize:rf(16),
    textAlignVertical:'top',
    fontFamily:'PixelOperator',
    backgroundColor:'transparent',
  },

  submitButton:{
    backgroundColor:'#7A4DFF',
    borderRadius:rf(18),
    borderWidth:1,
    borderColor:'#B68CFF',
    height:hp(7),
    justifyContent:'center',
    alignItems:'center',
    marginTop:hp(2),
  },

  submitText:{
    color:'#FFFFFF',
    fontSize:rf(18),
    fontFamily:'PixelBold',
  },

  starsContainer:{
    ...StyleSheet.absoluteFillObject,
  },

  star:{
    position:'absolute',
    backgroundColor:'#FFFFFF',
    shadowColor:'#FFFFFF',
    shadowOpacity:1,
    shadowRadius:4,
  },

  star1:{
    width:2,
    height:2,
    borderRadius:99,
    top:'10%',
    left:'15%',
    opacity:0.6,
  },

  star2:{
    width:4,
    height:4,
    borderRadius:99,
    top:'18%',
    left:'80%',
    opacity:1,
  },

  star3:{
    width:3,
    height:3,
    borderRadius:99,
    top:'30%',
    left:'45%',
    opacity:0.8,
  },

  star4:{
    width:2,
    height:2,
    borderRadius:99,
    top:'38%',
    left:'12%',
    opacity:0.5,
  },

  star5:{
    width:5,
    height:5,
    borderRadius:99,
    top:'50%',
    left:'88%',
    opacity:1,
  },

  star6:{
    width:3,
    height:3,
    borderRadius:99,
    top:'62%',
    left:'25%',
    opacity:0.7,
  },

  star7:{
    width:2,
    height:2,
    borderRadius:99,
    top:'72%',
    left:'65%',
    opacity:0.5,
  },

  rocketCircle: {
    width: rf(89),
    height: rf(89),
    borderRadius: rf(99),
    backgroundColor: 'rgba(255, 217, 28, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  star8:{
    width:4,
    height:4,
    borderRadius:99,
    top:'82%',
    left:'10%',
    opacity:0.9,
  },

  star9:{
    width:3,
    height:3,
    borderRadius:99,
    top:'90%',
    left:'75%',
    opacity:0.8,
  },

  star10:{
    width:2,
    height:2,
    borderRadius:99,
    top:'22%',
    left:'60%',
    opacity:0.4,
  },

  star11:{
    width:3,
    height:3,
    borderRadius:99,
    top:'8%',
    left:'35%',
    opacity:0.9,
  },

  star12:{
    width:2,
    height:2,
    borderRadius:99,
    top:'14%',
    left:'55%',
    opacity:0.4,
  },

  star13:{
    width:4,
    height:4,
    borderRadius:99,
    top:'25%',
    left:'90%',
    opacity:1,
  },

  star14:{
    width:2,
    height:2,
    borderRadius:99,
    top:'33%',
    left:'70%',
    opacity:0.6,
  },

  star15:{
    width:3,
    height:3,
    borderRadius:99,
    top:'42%',
    left:'30%',
    opacity:0.8,
  },

  star16:{
    width:5,
    height:5,
    borderRadius:99,
    top:'48%',
    left:'60%',
    opacity:1,
  },

  star17:{
    width:2,
    height:2,
    borderRadius:99,
    top:'58%',
    left:'82%',
    opacity:0.5,
  },

  star18:{
    width:3,
    height:3,
    borderRadius:99,
    top:'67%',
    left:'42%',
    opacity:0.8,
  },

  star19:{
    width:2,
    height:2,
    borderRadius:99,
    top:'78%',
    left:'55%',
    opacity:0.5,
  },

  star20:{
    width:4,
    height:4,
    borderRadius:99,
    top:'88%',
    left:'20%',
    opacity:0.9,
  },

  meteorTail:{
    width:rf(180),
    height:3,
  },

  meteor1:{
    position:'absolute',
    top:'8%',
    left:'75%',
    shadowColor:'#FFFFFF',
    shadowOpacity:1,
    shadowRadius:10,
  },

  meteor2:{
    position:'absolute',
    top:'22%',
    left:'10%',
    shadowColor:'#FFD633',
    shadowOpacity:1,
    shadowRadius:10,
  },

  meteor3:{
    position:'absolute',
    top:'38%',
    left:'85%',
    shadowColor:'#C86DFF',
    shadowOpacity:1,
    shadowRadius:10,
  },

  meteor4:{
    position:'absolute',
    top:'55%',
    left:'5%',
    shadowColor:'#7DF9FF',
    shadowOpacity:1,
    shadowRadius:10,
  },

  meteor5:{
    position:'absolute',
    top:'72%',
    left:'78%',
    shadowColor:'#FF82C8',
    shadowOpacity:1,
    shadowRadius:10,
  },

  meteor6:{
    position:'absolute',
    top:'88%',
    left:'25%',
    shadowColor:'#FFAA00',
    shadowOpacity:1,
    shadowRadius:10,
  },

  meteor7:{
    position:'absolute',
    top:'94%',
    left:'70%',
    shadowColor:'#FFFFFF',
    shadowOpacity:1,
    shadowRadius:10,
  },

  meteor8:{
    position:'absolute',
    top:'98%',
    left:'5%',
    shadowColor:'#FFD633',
    shadowOpacity:1,
    shadowRadius:10,
  },
});