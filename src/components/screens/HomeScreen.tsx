import React from 'react';
import { HomeStackNavigationProp } from '../../../types';
import PictureGrid from '../picturegrid';


interface HomeScreenProps {
    navigation: HomeStackNavigationProp;
  }
const cardData = [
  {
    id: '1',
    title: 'Abandoned Ship',
    description: 'The Abandoned Ship is a wrecked ship located on Route 108 in Hoenn.',
    imageUrl: 'https://picsum.photos/700',
    author: "Béda Trávníček",
    price: 0.2
  },
  {
    id: '2',
    title: 'Ancient Ruins',
    description: 'Mysterious ruins that hold secrets from the past.',
    imageUrl: 'https://picsum.photos/701',
    author: "Jehova",
    price: 0.002
  },
  {
    id: '3',
    title: 'Running with scissors in blood',
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    imageUrl: 'https://picsum.photos/704',
    author: "Jonathan Frederick Longringhen",
    price: 20
  },
];

function HomeScreenContent({ navigation }: HomeScreenProps) {
  return (
    <PictureGrid
      navigation={navigation}
      cardData={cardData}
    />
  );
}

export default HomeScreenContent;