import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors } from '../../theme/colors.ts';

type Props = {
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onPress?: () => void;
  children?: React.ReactNode;
  size?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export function FloatButton({
  position,
  onPress,
  children,
  size = 60,
  backgroundColor = colors.brandYellow,
  style,
  disabled,
}: Props) {
  const margin = 16;

  const posStyle: ViewStyle = position.startsWith('top')
    ? { top: margin }
    : { bottom: margin };

  Object.assign(
    posStyle,
    position.endsWith('left') ? { left: 0 } : { right: 0 },
  );

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        disabled={disabled}
        accessibilityRole="button"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={[
          styles.button,
          posStyle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            opacity: disabled ? 0.6 : 1,
          },
          style,
        ]}
      >
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },

    elevation: 6,
  },
  content: { alignItems: 'center', justifyContent: 'center' },
});
