import React from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../types';

type DetailScreenProps = {
  route: RouteProp<HomeStackParamList, 'Detail'>;
};

const { height, width } = Dimensions.get('window');

const DetailScreen = ({ route }: DetailScreenProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { description, imageUrl, author, title } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      
      <ScrollView 
        style={[styles.contentWrapper, { backgroundColor: `${theme.colors.surface}CC` }]}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}
      >
        <View style={[styles.handle, { backgroundColor: theme.colors.onSurfaceVariant }]} />
        <Text style={[styles.author, { color: theme.colors.onSurface }]}>{title} by {author}</Text>
        <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>{description}</Text>
      </ScrollView>
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
  contentWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    padding: 20,
    minHeight: '100%',
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
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