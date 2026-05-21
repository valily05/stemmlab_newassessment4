import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Text, View } from 'react-native';

export default function LoadingScreen() {
  const router = useRouter();

  const [loaded] = useFonts({
    Pixel: require('@/assets/fonts/PublicPixel.ttf'),
    Wix: require('@/assets/fonts/WixMadeforText-Bold.ttf'),
    PixelOperator: require('@/assets/fonts/PixelOperator.ttf'),
  });

  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  const { width, height } = Dimensions.get('window');
  const BAR_WIDTH = width * 0.75;
  const UNIT = width * 0.015;
  const FONT = width * 0.35;

    const facts = [
    "Venus is the only planet that rotates clockwise!",
    "A day on Venus is longer than a year!",
    "Bananas are radioactive due to potassium!"
  ];

    const [factIndex, setFactIndex] = useState(0);


  const fadeAnim = useRef(new Animated.Value(1)).current;

  // 🔵 dots animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 🟩 loading bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 130);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        // change text
        setFactIndex((prev) => (prev + 1) % facts.length);

        // fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }).start();
      });
    }, 2500);
return () => clearInterval(interval);
  }, []);

  // ⏳ navigation
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        router.replace('/signup');
      }, 6908);

      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <View style={{ flex: 1 }}>

      {/* Background */}
      <Image 
        source={require('../assets/images/bg1.png')} 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
      />

       <Image 
        source={require('../assets/images/logo.png')}
        style={{
          position:'absolute',
          bottom:height *0.689,
          width: width *0.95,
          height: height *0.4,
          alignSelf: 'center',
          zIndex: 10,
        }}
        resizeMode="contain"
      />

      {/* Bottom Box */}
      <Image 
        source={require('../assets/images/tb.png')}
        style={{
          position: 'absolute',
          bottom: height *0.07,
          width: width *0.8,
          height: height * 0.25,
          alignSelf: 'center',
          zIndex: 10,
        }}
        resizeMode="contain"
      />


      {/* Title */}
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: height*0.17
      }}>
        <Text style={{
          fontFamily: 'Pixel',
          fontSize: FONT * 0.089,
          color: 'white',
          letterSpacing: -0.9,
          textShadowColor: 'black',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 0,
        }}>
          A REAL WORLD STEMM GAME
        </Text>
      </View>

           {/* Bunny */}
      <Image 
        source={require('../assets/images/bunny.png')}
        style={{
          position: 'absolute',
          bottom: height * 0.06,
          width: width * 1.6,
          height: width *1.6,
          alignSelf: 'center',
          zIndex: 10,
        }}
        resizeMode="contain"
      />

      {/* DID YOU KNOW */}
      <View style={{
        alignItems: 'center',
        top: height * 0.47,
      }}>
        <Text style={{
          fontFamily: 'Pixel',
          fontSize: FONT * 0.095,
          color: 'yellow',
          letterSpacing: -0.9,
          position: 'absolute',
          zIndex: 11
        }}>
          DID YOU KNOW ?
        </Text>
      </View>

         {/* Fun facts */}
      <View style={{
        paddingTop: height*0.5,
        zIndex:12,
        alignSelf:'center',
        width:width * 0.7,
        

      }}>
        <Animated.Text style={{
          fontFamily: 'PixelOperator',
          fontSize: FONT * 0.156,
          color: 'white',
          textAlign:'center',
          opacity:fadeAnim
          
        
        }}>
          {facts[factIndex]}
          </Animated.Text>
      </View>

      {/*  LOADING SECTION */}
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: height * 0.05,
        zIndex:11,
      }}>

       
       {/*  PIXEL PERFECT BAR */}
<View style={{
  marginBottom: 10,
  alignItems: 'center'
}}>

  {/* OUTER FRAME */}
  <View style={{
    backgroundColor: 'white',
    paddingHorizontal: width * 0.019,
    paddingVertical: height * 0.005,
    position: 'relative',
    zIndex:11,
  }}>

    {/* 🔲 TOP + BOTTOM LONG PIXELS */}
    {[
      { top: -UNIT, left: -UNIT },
      { top: -UNIT, right: -UNIT },
      { bottom: -UNIT, left: -UNIT },
      { bottom: -UNIT, right: -UNIT }
    ].map((pos, i) => (
      <View
        key={i}
        style={{
          position: 'absolute',
          width: BAR_WIDTH * 0.72,
          height: UNIT,
          backgroundColor: '#40A560',
          ...pos,
          zIndex: 11,
        }}
      />
    ))}

    {/* SIDE WHITE BLOCKS */}
    {[
      { top: 0, left: -UNIT },
      { top: 0, right: -UNIT },
      { bottom: 0, left: -UNIT },
      { bottom: 0, right: -UNIT }
    ].map((pos, i) => (
      <View
        key={i}
        style={{
          position: 'absolute',
          width: UNIT,
          height: UNIT * 5,
          backgroundColor: 'white',
          ...pos,
          zIndex: 11,
        }}
      />
    ))}

    {/* INNER GREEN PIXEL */}
    <View style={{
      position: 'absolute',
      top: UNIT * 1.3,
      left: UNIT * -0.3,
      width: UNIT * 3,
      height: UNIT * (UNIT/2),
      backgroundColor: '#40A560',
      zIndex: 11,
    }} />

    {/*  OUTER GREEN EDGES */}
    {[
      { top: 0, left: -UNIT * 2 },
      { top: 0, right: -UNIT * 2 },
      { bottom: 0, left: -UNIT * 2 },
      { bottom: 0, right: -UNIT * 2 }
    ].map((pos, i) => (
      <View
        key={i}
        style={{
          position: 'absolute',
          width: UNIT,
          height: UNIT ,
          backgroundColor: '#40A560',
          ...pos,
          zIndex: 11,
        }}
      />
    ))}

    {/*  SECOND LAYER WHITE */}
    {[
      { top: UNIT, left: -UNIT * 2 },
      { top: UNIT, right: -UNIT * 2 },
      { bottom: UNIT, left: -UNIT * 2 },
      { bottom: UNIT, right: -UNIT * 2 }
    ].map((pos, i) => (
      <View
        key={i}
        style={{
          position: 'absolute',
          width: UNIT,
          height: UNIT * 2,
          backgroundColor: 'white',
          ...pos,
          zIndex: 11,
        }}
      />
    ))}

    {/*  OUTER GREEN FINAL */}
    {[
      { top: UNIT, left: -UNIT * 3 },
      { top: UNIT, right: -UNIT * 3 },
      { bottom: UNIT, left: -UNIT * 3 },
      { bottom: UNIT, right: -UNIT * 3 }
    ].map((pos, i) => (
      <View
        key={i}
        style={{
          position: 'absolute',
          width: UNIT,
          height: UNIT * 1.9,
          backgroundColor: '#40A560',
          ...pos,
          zIndex: 11,
        }}
      />
    ))}

    {/* INNER BAR */}
    <View style={{
      width: BAR_WIDTH,
      height: height * 0.03,
      backgroundColor: 'white',
      overflow: 'hidden',
      position: 'relative',
      zIndex:11,
    }}>

      {/* PROGRESS */}
      <View style={{
        width: `${progress}%`,
        height: '100%',
        backgroundColor: '#40A560',
        zIndex: 11,
      }} />

    </View>

  </View>
</View>

        {/* LOADING TEXT */}
        <Text style={{
          fontFamily: 'Pixel',
          fontSize: FONT * 0.098,
          color: 'white',
          letterSpacing: -0.9,
          bottom:-6
          
        }}>
          LOADING{dots}
        </Text>

      </View>

      {/* © Footer */}
      <View style={{
        alignItems: 'center',
        bottom: 10,
      }}>
        <Text style={{
          fontFamily: 'Wix',
          fontSize: 10,
          color: 'white',
          opacity: 0.6,
        }}>
          © 2026 STEMM LAB v1.0.0
        </Text>
      </View>

    </View>
  );
}

