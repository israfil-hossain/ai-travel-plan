import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="mytrip"
        options={{
          title: 'My Trip',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'location-sharp' : 'location-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'globe-sharp' : 'globe-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people-circle' : 'people-circle'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
