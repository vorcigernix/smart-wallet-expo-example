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
};

export type RootTabParamList = {
    Selection: undefined;
    Authors: undefined;
    Account: undefined;
};