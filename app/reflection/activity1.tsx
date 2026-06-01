import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Rocket, Star } from 'lucide-react-native';
import { useState } from 'react';
import {
    Dimensions,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

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

export default function Activity1Reflection() {

  const [rating, setRating] =
    useState(0);

  const [learned, setLearned] =
    useState('');

  const [improvement, setImprovement] =
    useState('');

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
<View style={styles.meteor1}>
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
</View>

<View style={styles.meteor2}>
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
</View>

<View style={styles.meteor3}>
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
</View>
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
    ACTIVITY REFLECTION
  </Text>

  <View
    style={{ width: rf(24) }}
  />

</View>

<ScrollView
  contentContainerStyle={
    styles.content
  }
>

<View style={styles.heroCard}>

  <Rocket
    size={rf(45)}
    color="#FFE95B"
  />

  <Text style={styles.heroTitle}>
    ACTIVITY COMPLETE
  </Text>

  <Text style={styles.heroText}>
    Great job completing the
    Parachute Drop Challenge.
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

<Text style={styles.cardTitle}>
  WHAT DID YOU LEARN?
</Text>

<TextInput
  multiline
  value={learned}
  onChangeText={setLearned}
  placeholder="Describe what you discovered during this experiment..."
  placeholderTextColor="#9AA3D8"
  style={styles.input}
/>

</View>

<View style={styles.card}>

<Text style={styles.cardTitle}>
  WHAT WOULD YOU IMPROVE?
</Text>

<TextInput
  multiline
  value={improvement}
  onChangeText={
    setImprovement
  }
  placeholder="What changes would you make to your next prototype?"
  placeholderTextColor="#9AA3D8"
  style={styles.input}
/>

</View>

<TouchableOpacity
  style={styles.submitButton}
  onPress={() => {

    console.log({
      rating,
      learned,
      improvement,
    });

    router.replace(
      '/(tabs)/homescreen'
    );
  }}
>

<Text style={styles.submitText}>
   SUBMIT & RETURN HOME
</Text>

</TouchableOpacity>

</ScrollView>

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
  backgroundColor:'rgba(42,13,69,0.9)',

  borderRadius:rf(20),

  borderWidth:2,
  borderColor:'#C86DFF',

  padding:rf(24),

  alignItems:'center',

  marginBottom:hp(3),
},

heroTitle:{
  color:'#FFE95B',
  fontSize:rf(24),
  fontFamily:'PixelBold',

  marginTop:hp(1),
},

heroText:{
  color:'#D8D8FF',
  textAlign:'center',

  marginTop:hp(1),

  fontFamily:'PixelOperator',
},

card:{
  backgroundColor:'#121127',

  borderRadius:rf(18),

  borderWidth:1,
  borderColor:'rgba(255,255,255,0.08)',

  padding:rf(18),

  marginBottom:hp(2),
},

cardTitle:{
  color:'#FFFFFF',
  fontSize:rf(16),
  fontFamily:'PixelBold',

  marginBottom:hp(2),
},

starRow:{
  flexDirection:'row',
  justifyContent:'space-between',
},

input:{
  height:hp(16),

  backgroundColor:'#1B1A33',

  borderWidth:1,
  borderColor:'#7A4DFF',

  borderRadius:rf(14),

  padding:rf(14),

  color:'#FFFFFF',

  textAlignVertical:'top',

  fontFamily:'PixelOperator',
},

submitButton:{
  backgroundColor:'#7A4DFF',

  borderRadius:rf(18),

  height:hp(7),

  justifyContent:'center',
  alignItems:'center',

  marginTop:hp(2),

  borderWidth:1,
  borderColor:'#B68CFF',
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
  width:rf(90),
  height:2,
},

meteor1:{
  position:'absolute',

  top:'12%',
  left:'70%',

  transform:[
    { rotate:'45deg' }
  ],
},

meteor2:{
  position:'absolute',

  top:'48%',
  left:'15%',

  transform:[
    { rotate:'45deg' }
  ],
},

meteor3:{
  position:'absolute',

  top:'78%',
  left:'72%',

  transform:[
    { rotate:'45deg' }
  ],
},
});