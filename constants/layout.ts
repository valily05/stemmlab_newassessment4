import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export interface LayoutConfig {
  width: number;
  height: number;
  barWidth: number;
  unit: number;
  fontBase: number;
  paddingHorizontal: number;
  inputHeight: number;
}



export const LAYOUT: LayoutConfig = {
  width,
  height,
  barWidth: width * 0.75,
  unit: width * 0.015,
  fontBase: width * 0.35,
  inputHeight: height * 0.06,
  paddingHorizontal: width * 0.08,
};

export const COLORS = {
  green: '#40A560',
  white: '#FFFFFF',
  yellow: '#FFFF00',
  black: '#000000',
  lightPurple :'#6B6A98'
};

export const AUTH_COLORS = {
  inputBg: '#060B1D',
  inputBorder: '#6568C7',
  buttonPurple: '#722AE4',
  textGray: '#aaa',
  
};

export const FACTS = {
  English: [
    "Venus is the only planet that rotates clockwise!",
    "A day on Venus is longer than a year!",
    "Bananas are radioactive due to potassium!"
  ],
  "Bahasa Indonesia": [
    "Venus adalah satu-satunya planet yang berputar searah jarum jam!",
    "Satu hari di Venus lebih lama dari satu tahun!",
    "Pisang bersifat radioaktif karena mengandung kalium!"
  ]
} as const;