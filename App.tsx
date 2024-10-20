import "./src/polyfill";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { WagmiProvider } from "wagmi";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { handleResponse } from "@mobile-wallet-protocol/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { View, useColorScheme } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Text, BottomNavigation, useTheme, Button } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { config } from "./src/wagmiDemo";
import DetailScreen from "./src/components/DetailScreen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootTabParamList, HomeStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenContent from "./src/components/HomeScreen";
import { styles } from "./styles";


const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStack() {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreenContent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: "",
          headerTransparent: true,
          headerTitleContainerStyle: {bottom:10},
          headerTintColor: theme.colors.onSurface,
          headerRight: () => (
            <Button
              mode="contained"
              onPress={() => console.log('Mint pressed')}
              style={{ marginRight: 10 }}
            >
              Mint ${route.params.price}
            </Button>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
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
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

export default function App() {
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
      colorScheme === 'dark'
        ? { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, ...theme.dark } }
        : { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...theme.light } },
    [colorScheme, theme]
  );

  return (
    <SafeAreaProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={paperTheme}>
            <NavigationContainer>
              <StatusBar
                translucent={true}
                backgroundColor="transparent"
                style={colorScheme === 'dark' ? "light" : "dark"}
              />
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
                  component={HomeStack}
                  options={{
                    tabBarIcon: ({ color, size }) => {
                      return <MaterialIcons name="panorama-photosphere" size={size} color={color} />;
                    },
                  }}
                />
                <Tab.Screen
                  name="Authors"
                  component={SettingsScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => {
                      return <MaterialCommunityIcons name="book-account-outline" size={size} color={color} />;
                    },
                  }}
                />
                <Tab.Screen
                  name="Account"
                  component={SettingsScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => {
                      return <MaterialCommunityIcons name="account-cog-outline" size={size} color={color} />;
                    },
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SafeAreaProvider>
  );
}