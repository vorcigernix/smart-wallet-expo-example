import React from 'react';
import { Card as PaperCard, Paragraph, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { CardItem, HomeStackParamList } from '../../types';
import { cardstyles } from '../../styles';

interface CustomCardProps {
  item: CardItem;
  navigation: StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
}
const CustomCard: React.FC<CustomCardProps> = ({ item, navigation }) => {
  const { id, title, description, imageUrl, author, price } = item;
  const handlePress = () => {
    // Only pass serializable data
    navigation.navigate('Detail', {
      id,
      title,
      description,
      imageUrl,
      author,
      price
    });
  };

  return (
    <PaperCard
      style={cardstyles.card}
      mode="contained"
      onPress={handlePress}
    >
      <PaperCard.Cover source={{ uri: imageUrl }} />
      <PaperCard.Title title={title} />
      <PaperCard.Content>
        <Paragraph numberOfLines={4} ellipsizeMode="tail"><Text variant="bodyMedium">{description}</Text></Paragraph>

      </PaperCard.Content>
    </PaperCard>
  );
};

export default CustomCard;