import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../../styles';
import { CardItem, HomeStackNavigationProp } from '../../types';
import CustomCard from './card';

interface PictureGridProps {
    navigation: HomeStackNavigationProp;
    cardData: CardItem[];
    author?: string;
  }
  
  const PictureGrid: React.FC<PictureGridProps> = ({ navigation, cardData, author }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
  
    return (
      <View
        style={[
          styles.screenContainer,
          {
            backgroundColor: theme.colors.background,
            paddingTop: insets.top
          }
        ]}
      >
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            {cardData.map((item) => (
              <CustomCard
                key={item.id}
                item={item}
                navigation={navigation}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default PictureGrid;