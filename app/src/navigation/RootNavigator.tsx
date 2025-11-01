import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterProduct from '../screens/RegisterProduct';
import { enableScreens } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsListScreen from '../screens/ProductsListScreen.tsx';
import LocalsListScreen from '../screens/LocalsListScreen.tsx';
import { AppIcon } from '../components/atoms/AppIcon.tsx';
import { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

enableScreens(true);

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Feed: undefined;
  Product: undefined;
};

export type TabParamList = {
  ProductList: undefined;
  LocalList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Product" component={RegisterProduct} />
      <Stack.Screen name="Feed" component={TabNavigation} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigation() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarLabelPosition: 'beside-icon',
        tabBarItemStyle: { flexDirection: 'row' },
        tabBarIconStyle: { marginRight: 8 },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#a337a6',
        tabBarInactiveTintColor: '#000000',

        tabBarStyle: {
          height: 50 + insets.bottom,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#000000',
        },

        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },

        tabBarLabel:
          route.name === 'ProductList' ? 'Produtos' : 'Locais',

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: MaterialDesignIconsIconName;

          if (route.name === 'ProductList') {
            iconName = focused ? 'tag' : 'tag-outline';
          } else {
            iconName = focused ? 'storefront' : 'storefront-outline';
          }

          return (
            <AppIcon
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="ProductList"
        component={ProductsListScreen}
        options={{
          title: 'Produtos',
        }}
      />

      <Tab.Screen
        name="LocalList"
        component={LocalsListScreen}
        options={{
          title: 'Locais',
        }}
      />
    </Tab.Navigator>
  );
}