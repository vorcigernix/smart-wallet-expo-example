import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Surface, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../types';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolation,
    useDerivedValue,
    runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type DetailScreenProps = {
    route: RouteProp<HomeStackParamList, 'Detail'>;
};

const { height, width } = Dimensions.get('window');
const MIN_TRANSLATE_Y = -height + 200;
const MAX_TRANSLATE_Y = -height * 0.3;

const DetailScreen = ({ route }: DetailScreenProps) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const { description, imageUrl, author, title } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const translateY = useSharedValue(MAX_TRANSLATE_Y);
    const context = useSharedValue({ y: 0 });

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            translateY.value = Math.max(
                MIN_TRANSLATE_Y,
                Math.min(MAX_TRANSLATE_Y, context.value.y + event.translationY)
            );
        })
        .onEnd((event) => {
            const shouldSnap = event.velocityY > 500 ||
                (event.velocityY >= 0 && translateY.value > MIN_TRANSLATE_Y / 2);

            if (shouldSnap) {
                translateY.value = withSpring(MAX_TRANSLATE_Y, { velocity: event.velocityY });
            } else {
                translateY.value = withSpring(MIN_TRANSLATE_Y, { velocity: event.velocityY });
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const backdropStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
            [0.5, 0],
            Extrapolation.CLAMP
        );
        return { opacity };
    });

    const handleAuthorPress = () => {
        // Navigate to author's pictures list
        //navigation.navigate('AuthorPictures', { author });
        console.log("Author clicked");
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
            <Animated.View style={[styles.backdrop, backdropStyle]} />
            <GestureDetector gesture={gesture}>
                <Animated.View
                    style={[
                        styles.contentWrapper,
                        { backgroundColor: theme.colors.surface },
                        animatedStyle
                    ]}
                >
                    <View style={[styles.handle, { backgroundColor: theme.colors.onSurfaceVariant }]} />
                    <Animated.ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}
                    >
                        <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
                        <Surface style={styles.authorSurface}>
                            <TouchableOpacity onPress={handleAuthorPress} style={styles.authorTouchable}>
                                <Avatar.Text size={40} label={author.charAt(0).toUpperCase()} />
                                <View style={styles.authorTextContainer}>
                                    <Text style={[styles.authorLabel, { color: theme.colors.onSurfaceVariant }]}>Designer</Text>
                                    <Text style={[styles.author, { color: theme.colors.primary }]}>{author}</Text>
                                </View>
                            </TouchableOpacity>
                        </Surface>
                        <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>{description}</Text>
                    </Animated.ScrollView>
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width,
        height: height,
        position: 'absolute',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
    },
    contentWrapper: {
        position: 'absolute',
        top: height,
        left: 0,
        right: 0,
        height: height,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    handle: {
        width: 40,
        height: 5,
        borderRadius: 3,
        alignSelf: 'center',
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    authorSurface: {
        marginVertical: 16,
        borderRadius: 8,
        elevation: 1,
    },
    authorTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    authorTextContainer: {
        marginLeft: 16,
    },
    authorLabel: {
        fontSize: 12,
    },
    author: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default DetailScreen;