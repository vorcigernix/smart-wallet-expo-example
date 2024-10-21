import { NavigatorScreenParams } from '@react-navigation/native';
export interface CardItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    author: string;
    price: number;
}

export type HomeStackParamList = {
    HomeScreen: undefined;
    Detail: Omit<CardItem, 'navigation'>;
    AuthorsList: undefined;
    AuthorPictures: { author: string };
};

export type RootTabParamList = {
    Selection: undefined;
    Designers: undefined;
    Account: undefined;
};