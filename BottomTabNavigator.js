import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailScreen from './screens/DetailScreen';
import TodoScreen from './screens/MainScreen';
import HomeStackNavigator from './HomeStackNavigator'; 

// Create a bottom tab navigator instance
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    // Define the navigator container
    <Tab.Navigator>
      {/* Define each tab with its screen component */}
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
      <Tab.Screen name="Todo" component={TodoScreen} />
      <Tab.Screen name="Profile" component={DetailScreen} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
