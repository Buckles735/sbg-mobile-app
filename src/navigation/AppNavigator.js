import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Colors } from '../constants/theme';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import PhotoCaptureScreen from '../screens/PhotoCaptureScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuoteScreen from '../screens/QuoteScreen';
import SupportScreen from '../screens/SupportScreen';
import LearnScreen from '../screens/LearnScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MediaScreen from '../screens/MediaScreen';
import ElectrifyScreen from '../screens/ElectrifyScreen';
import EnergyPlanScreen from '../screens/EnergyPlanScreen';
import VPPScreen from '../screens/VPPScreen';
import WarrantyScreen from '../screens/WarrantyScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import BNPLScreen from '../screens/BNPLScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import InstallDayScreen from '../screens/InstallDayScreen';
import EnergyScreen from '../screens/EnergyScreen';
import MonitorScreen from '../screens/MonitorScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Simple icon component (will replace with proper icons later)
function TabIcon({ name, color, size }) {
  const icons = { Home: '🏠', Photos: '📷', Schedule: '📅', Chat: '💬', Profile: '👤' };
  return <Text style={{ fontSize: size - 4 }}>{icons[name] || '•'}</Text>;
}

// Bottom tab navigator for main screens
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => <TabIcon name={route.name} color={color} size={size} />,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 28,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Photos" component={PhotoCaptureScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Chat" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root stack navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Quote" component={QuoteScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Learn" component={LearnScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Media" component={MediaScreen} />
        <Stack.Screen name="Electrify" component={ElectrifyScreen} />
        <Stack.Screen name="EnergyPlan" component={EnergyPlanScreen} />
        <Stack.Screen name="VPP" component={VPPScreen} />
        <Stack.Screen name="Warranty" component={WarrantyScreen} />
        <Stack.Screen name="Payments" component={PaymentsScreen} />
        <Stack.Screen name="BNPL" component={BNPLScreen} />
        <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
        <Stack.Screen name="InstallDay" component={InstallDayScreen} />
        <Stack.Screen name="Energy" component={EnergyScreen} />
        <Stack.Screen name="Monitor" component={MonitorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
