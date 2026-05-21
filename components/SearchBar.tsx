import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({
  search,
  setSearch,
}: Props) {

  return (
    <View style={styles.container}>

      <Text style={styles.icon}>
        🔍
      </Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search activities..."
        placeholderTextColor="#A78BFA"
        style={styles.input}
      />

    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  marginTop: 28,

  height: 54,

  borderRadius: 18,

  backgroundColor: 'rgba(10,10,25,0.82)',

  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.06)',

  flexDirection: 'row',
  alignItems: 'center',

  paddingHorizontal: 18,
},

  icon: {
    fontSize: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
  },
});