import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/logo-shop.png')}
        resizeMode="contain"
        style={{
          height: 50,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Header;
