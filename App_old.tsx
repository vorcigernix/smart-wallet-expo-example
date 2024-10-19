// Pre-requisite 1. Polyfill
import "./src/polyfill";
//wallet related stuff
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { handleResponse } from "@mobile-wallet-protocol/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';


import EIP1193Demo from "./src/eip1193Demo";
import WagmiDemo, { config } from "./src/wagmiDemo";



const queryClient = new QueryClient();

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home!</Text>
    </View>
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

  return (
    <SafeAreaProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
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
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return <Icon name="home" size={size} color={color} />;
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
        </QueryClientProvider>
      </WagmiProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
