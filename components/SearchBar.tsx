import React from 'react';

import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );
};

const hp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );
};

const fp = (size: number) => {
  return PixelRatio.roundToNearestPixel(
    (width / 430) * size
  );
};

export default function SearchBar({
  search,
  setSearch,
  placeholder = 'Search...',
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Group 72.png')}
        style={styles.searchIcon}
      />

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder={placeholder}
        placeholderTextColor="#ffffff"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp(3.9),

    height: hp(6.4),

    borderRadius: wp(4),

    backgroundColor: '#0D0824',

    borderWidth: 2,
    borderColor: '#2B1B59',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: wp(4),
  },

  searchIcon: {
    width: wp(4.3),
    height: wp(4.3),

    resizeMode: 'contain',
  },

  input: {
    flex: 1,

    marginLeft: wp(3),

    color: '#fff',

    fontFamily: 'PixelOperator',

    fontSize: fp(18),
  },
});