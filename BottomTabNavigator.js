import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailScreen from './screens/DetailScreen';
import TodoScreen from './screens/MainScreen';
import HomeStackNavigator from './HomeStackNavigator'; 
import JohnScreen from './screens/JohnProfileScreen';
import { Ionicons } from '@expo/vector-icons';

// Create a bottom tab navigator instance
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    // Define the navigator container
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'HomeStack') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'Todo') {
          iconName = focused ? 'list' : 'list';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
      {/* Define each tab with its screen component */}
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
      <Tab.Screen name="Todo" component={TodoScreen} />
      <Tab.Screen name="Profile" component={JohnScreen} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
