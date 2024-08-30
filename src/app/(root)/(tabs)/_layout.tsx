import { Tabs } from 'expo-router';
import {
  LucideCalendar,
  LucideLayoutDashboard,
  LucidePieChart,
  LucideStethoscope,
  LucideUserCircle2,
} from 'lucide-react-native';
import React from 'react';
import { Image, View } from 'react-native';

const TabIcon = ({ focused, source }: any) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full ${
      focused ? 'bg-gray-800' : ''
    }`}
  >
    <View
      className={`rounded-full w-8 h-8 items-center justify-center ${
        focused ? 'bg-black' : ''
      }`}
    >
      <Image
        source={source}
        tintColor={'white'}
        resizeMode="contain"
        className="w-5 h-5"
      />
    </View>
  </View>
);

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: '#dfcbfa',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#0E0E0E',
          borderRadius: 20,
          paddingBottom: 0,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="patients"
        options={{
          title: 'Patients',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <LucideStethoscope
              size={25}
              color={focused ? '#8167EC' : 'white'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <LucideCalendar size={25} color={focused ? '#8167EC' : 'white'} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <LucideLayoutDashboard
              size={25}
              color={focused ? '#8167EC' : 'white'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <LucidePieChart size={25} color={focused ? '#8167EC' : 'white'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <LucideUserCircle2
              size={25}
              color={focused ? '#8167EC' : 'white'}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
