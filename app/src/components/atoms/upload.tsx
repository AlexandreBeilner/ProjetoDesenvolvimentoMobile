import React, {useCallback, useState, useEffect} from 'react';
import {Image, Pressable, StyleSheet, ViewStyle} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import uploadIcon from "../../assets/upload.png";
import {colors} from '../../theme/colors';

type Props = {
  value?: string | null;
  onChange?: (uri: Asset) => void;
  size?: number;
  style?: ViewStyle;
};

export default function Upload({value, onChange, size = 140, style}: Props) {
  const [uri, setUri] = useState<string | null>(value ?? null);
  useEffect(() => { if (value !== undefined) setUri(value); }, [value]);

  const pick = useCallback(async () => {
    const opts: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 1,
      quality: 0.9,
    };
    const res = await launchImageLibrary(opts);
    if (res.didCancel || res.errorCode) return;
    const asset = res.assets?.[0];
    if (asset?.uri) {
      setUri(asset.uri);
      onChange?.(asset);
    }
  }, [onChange]);

  return (
    <Pressable
      onPress={pick}
      style={[
        styles.wrap,
        {width: size, height: size, borderRadius: size / 2},
        style,
      ]}>
      {uri ? (
        <Image source={{uri}} style={{width: '100%', height: '100%', borderRadius: size / 2}} />
      ) : (
        <Image source={uploadIcon} style={{width: size * 0.6, height: size * 0.6}} resizeMode="contain" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.text,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
});
