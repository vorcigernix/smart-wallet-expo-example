// Pre-requisite 1. Polyfill
import "./src/polyfill";
//wallet related stuff
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { WagmiProvider } from "wagmi";

import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { handleResponse } from "@mobile-wallet-protocol/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, useColorScheme, ScrollView } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Card, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import WagmiDemo, { config } from "./src/wagmiDemo";



const queryClient = new QueryClient();

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
});

function HomeScreen() {
  return (

    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card} mode='contained'>
          <Card.Cover
            source={{ uri: 'https://picsum.photos/700' }}
          />
          <Card.Title title="Abandoned Ship" />
          <Card.Content>
            <Text variant="bodyMedium">
              The Abandoned Ship is a wrecked ship located on Route 108 in
              Hoenn, originally being a ship named the S.S. Cactus. The second
              part of the ship can only be accessed by using Dive and contains
              the Scanner.
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card} mode='contained'>
          <Card.Cover
            source={{ uri: 'https://picsum.photos/700' }}
          />
          <Card.Title title="Abandoned Ship" />
          <Card.Content>
            <Text variant="bodyMedium">
              The Abandoned Ship is a wrecked ship located on Route 108 in
              Hoenn, originally being a ship named the S.S. Cactus. The second
              part of the ship can only be accessed by using Dive and contains
              the Scanner.
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card} mode='contained'>
          <Card.Cover
            source={{ uri: 'https://picsum.photos/700' }}
          />
          <Card.Title title="Abandoned Ship" />
          <Card.Content>
            <Text variant="bodyMedium">
              The Abandoned Ship is a wrecked ship located on Route 108 in
              Hoenn, originally being a ship named the S.S. Cactus. The second
              part of the ship can only be accessed by using Dive and contains
              the Scanner.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>

  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

export default function App() {
  // Pre-requisite 2. Setup deeplinking handling
  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      console.log("incoming deeplink:", url);
      try {
        handleResponse(url);
      } catch (err) {
        console.error(err);
      }
    });

    return () => subscription.remove();
  }, []);

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
    <SafeAreaProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={paperTheme}>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                }}
                tabBar={({ navigation, state, descriptors, insets }) => (
                  <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                      const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                      });

                      if (event.defaultPrevented) {
                        preventDefault();
                      } else {
                        navigation.dispatch({
                          ...CommonActions.navigate(route.name, route.params),
                          target: state.key,
                        });
                      }
                    }}
                    renderIcon={({ route, focused, color }) =>
                      descriptors[route.key].options.tabBarIcon?.({
                        focused,
                        color,
                        size: 24,
                      }) || null
                    }
                    getLabelText={({ route }) => descriptors[route.key].route.name}
                  />
                )}
              >
                <Tab.Screen
                  name="Selection"
                  component={HomeScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => {
                      return <MaterialIcons name="panorama-photosphere-select" size={size} color={color} />;
                    },
                  }}
                />
                <Tab.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => {
                      return <Icon name="cog" size={size} color={color} />;
                    },
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </QueryClientProvider>
      </WagmiProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
