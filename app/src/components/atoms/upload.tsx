import React from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import upload from '../../assets/upload.png';

export default function Logo(props: Omit<ImageProps, 'source'>) {
  return (
    <View style={styles.wrap}>
      <Image source={upload} style={[styles.img, props.style]} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  img: { width: 150, height: 200 },
});
