import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailScreen from './screens/DetailScreen';
import TodoScreen from './screens/MainScreen';
import TodoScreen2 from './screens/MainScreen2';
import HomeStackNavigator from './HomeStackNavigator'; 
import JohnScreen from './screens/JohnProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

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
      tabBarActiveBackgroundColor:'#000080',
      tabBarInactiveBackgroundColor:'#fff',
    })}
    tabBarOptions={{
      activeTintColor: '#fff',
      // 'tomato',
      inactiveTintColor: '#000080',
    }}
  >
      {/* Define each tab with its screen component */}
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} style={styles.background}/>
      <Tab.Screen name="Todo" component={TodoScreen} />
      <Tab.Screen name="Profile" component={JohnScreen} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000080',
  }
})
export default BottomTabNavigator;
