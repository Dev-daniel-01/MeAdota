import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';


export default function TabLayout() {

  return (
    <Tabs>
      <Tabs.Screen name='index' options={{headerShown: false, tabBarStyle:{display: 'none' }}}></Tabs.Screen>
      <Tabs.Screen name='explore' options={{headerShown: false, tabBarStyle:{display: 'none' }}}></Tabs.Screen>     

    </Tabs>
  );
}