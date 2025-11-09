import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View, Dimensions } from 'react-native';
import AppText from '../atoms/AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const GAP = spacing.md; // 12
const H_PADDING = spacing.xl; // 24 (screen horizontal padding)
const AVAIL = Dimensions.get('window').width - (H_PADDING * 2) - GAP;
const CARD_W = Math.floor(AVAIL / 2); // show 2 cards per viewport

export type Product = {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    image: string;
};

type Props = { data: Product; onPress?: () => void };

function Card({ data, onPress }: Props) {
    return (
        <Pressable onPress={onPress} style={s.card}>
            <Image source={{ uri: data.image }} style={s.image} resizeMode="cover" />
            <View style={s.body}>
                <AppText numberOfLines={1} variant="small">{data.title}</AppText>
                <AppText numberOfLines={1} color="muted" variant="small">{data.subtitle}</AppText>
                <AppText style={s.price}>{data.price}</AppText>
            </View>
        </Pressable>
    );
}

export const ProductCard = memo(Card);

const s = StyleSheet.create({
    card: {
        width: CARD_W,
        marginRight: GAP,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        backgroundColor: colors.white,
        overflow: 'hidden',
    },
    image: { width: '100%', height: Math.round(CARD_W * 0.62) },
    body: { padding: spacing.sm },
    price: { marginTop: 4, fontWeight: '700', color: '#6A1B9A' },
});
