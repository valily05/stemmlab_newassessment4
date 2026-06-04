import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Dimensions, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const wp = (percentage: number) => PixelRatio.roundToNearestPixel((width * percentage) / 100);
const hp = (percentage: number) => PixelRatio.roundToNearestPixel((width * percentage) / 100);
const rf = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * (width / 390)));

interface TeamCodeCardProps {
  teamCode: string;
}

export default function TeamCodeCard({ teamCode }: TeamCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!teamCode || teamCode === '------') return;
    try {
      await Clipboard.setStringAsync(teamCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <View style={styles.outerContainerFrame}>
      <LinearGradient
        colors={['#0A0F14', '#0F2537', '#008CA3']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.balancedOverlay}>
        <Text style={styles.teamCodeLabel}>TEAM CODE</Text>

        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={copyToClipboard}
          style={styles.codeInteractiveRow}
        >
          <Text style={styles.teamCodeValue}>{teamCode}</Text>
          
          <View style={styles.copyIconBadge}>
            <Svg width={rf(14)} height={rf(14)} viewBox="0 0 24 24" fill="none">
              <Path
                d="M19 21H10C8.89543 21 8 20.1046 8 19V9C8 7.89543 8.89543 7 10 7H19C20.1046 7 21 7.89543 21 9V19C21 20.1046 20.1046 21 19 21Z"
                stroke={copied ? '#66FFA6' : '#00D6F2'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M16 3H5C3.89543 3 3 3.89543 3 5V15"
                stroke={copied ? '#66FFA6' : '#00D6F2'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
            </Svg>
          </View>
        </TouchableOpacity>

        <Text style={[styles.teamCodeHint, copied && styles.teamCodeCopiedHint]}>
          {copied ? '✓ COPIED TO CLIPBOARD' : 'Tap code to copy to clipboard'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainerFrame: { marginTop: hp(4), width: '100%', borderRadius: rf(15), overflow: 'hidden', position: 'relative', borderWidth: 1.5, borderColor: 'rgba(0, 214, 242, 0.39)' },
  balancedOverlay: { width: '100%', paddingVertical: hp(4.5), paddingHorizontal: wp(6), alignItems: 'center', backgroundColor: 'rgba(10, 16, 24, 0.7)', zIndex: 5 },
  teamCodeLabel: { color: '#A2CDD6', fontSize: rf(13), fontFamily: 'PixelOperator', letterSpacing: 0.5 },
  codeInteractiveRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: hp(1.5), paddingVertical: hp(0.5) },
  teamCodeValue: { color: '#FFFFFF', fontSize: rf(26), fontFamily: 'Pixel', textShadowColor: 'rgba(0, 214, 242, 0.4)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  copyIconBadge: { marginLeft: wp(3.5), backgroundColor: 'rgba(0, 214, 242, 0.12)', padding: rf(6), borderRadius: rf(6) },
  teamCodeHint: { color: 'rgba(162, 205, 214, 0.45)', marginTop: hp(1.5), fontSize: rf(12), fontFamily: 'PixelOperator' },
  teamCodeCopiedHint: { color: '#66FFA6', textShadowColor: 'rgba(102, 255, 166, 0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4, fontFamily: 'PixelBold' },
});