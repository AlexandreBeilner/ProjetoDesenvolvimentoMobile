import React from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import logo from '../../assets/logo.png';

export default function Logo(props: Omit<ImageProps, 'source'>) {
  return (
    <View style={styles.wrap}>
      <Image source={logo} style={[styles.img, props.style]} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  img: { width: 200, height: 200 },
});
