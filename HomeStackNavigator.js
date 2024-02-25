import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SurveySwiper from './components/SurveySwiper';

const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false, // Optional: Hide the header if not needed
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="Survey" component={SurveySwiper} />
    </Stack.Navigator>
  );
}
// { backgroundColor: 'transparent' }
export default HomeStackNavigator;
