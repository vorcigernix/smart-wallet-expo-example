import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
    Selection: NavigatorScreenParams<HomeStackParamList>;
    Designers: undefined;
    Account: undefined;
};

export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;