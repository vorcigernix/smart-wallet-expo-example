import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text, Surface, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types';


interface Author {
  id: string;
  name: string;
  bio: string;
}

const AUTHORS_DATA: Author[] = [
  { id: '1', name: 'Béda Trávníček', bio: 'Specializes in abandoned landscapes' },
  { id: '2', name: 'Jehova', bio: 'Expert in ancient ruins photography' },
  { id: '3', name: 'Jonathan Frederick Longringhen', bio: 'Avant-garde artist focusing on surreal compositions' },
  // Add more authors as needed
];

interface AuthorsListScreenProps {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'AuthorsList'>;
}

const AuthorsListScreen: React.FC<AuthorsListScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const renderAuthorItem = ({ item }: { item: Author }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AuthorPictures', { author: item.name })}
    >
      <Surface style={styles.authorSurface}>
        <Avatar.Text size={50} label={item.name.charAt(0).toUpperCase()} />
        <View style={styles.authorTextContainer}>
          <Text style={[styles.authorName, { color: theme.colors.primary }]}>{item.name}</Text>
          <Text style={[styles.authorBio, { color: theme.colors.onSurfaceVariant }]}>{item.bio}</Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.background,
        paddingTop: insets.top
      }
    ]}>
      <FlatList
        data={AUTHORS_DATA}
        renderItem={renderAuthorItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  authorSurface: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  authorTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorBio: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default AuthorsListScreen;