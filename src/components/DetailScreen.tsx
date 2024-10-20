import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DetailScreenProps = {
  route: RouteProp<HomeStackParamList, 'Detail'>;
};

const { height, width } = Dimensions.get('window');
const MIN_TRANSLATE_Y = -height + 100;
const MAX_TRANSLATE_Y = -height * 0.3;

const DetailScreen = ({ route }: DetailScreenProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { description, imageUrl, author, title } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const translateY = useSharedValue(MAX_TRANSLATE_Y);
  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = Math.max(
        MIN_TRANSLATE_Y,
        Math.min(MAX_TRANSLATE_Y, context.startY + event.translationY)
      );
    },
    onEnd: (event) => {
      const shouldSnap = event.velocityY > 500 || 
        (event.velocityY >= 0 && translateY.value > MIN_TRANSLATE_Y / 2);
      
      if (shouldSnap) {
        translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
      } else {
        translateY.value = withSpring(MIN_TRANSLATE_Y, { damping: 50 });
      }
    },
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
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const renderBackdrop = useCallback(() => (
    <Animated.View style={[styles.backdrop, backdropStyle]} />
  ), []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      {renderBackdrop()}
      <PanGestureHandler onGestureEvent={gestureHandler}>
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
            <Text style={[styles.author, { color: theme.colors.onSurface }]}>By {author}</Text>
            <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>{description}</Text>
          </Animated.ScrollView>
        </Animated.View>
      </PanGestureHandler>
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
  author: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DetailScreen;