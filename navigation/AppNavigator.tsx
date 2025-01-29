import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../src/screens/home/HomeScreen';
import AddTimerScreen from '../src/screens/add-timer/AddTimerScreen';
import HistoryScreen from '../src/screens/history/HistoryScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen}   options={{ headerShown: false }}  />
      <Stack.Screen name="AddTimer" component={AddTimerScreen} />
      <Stack.Screen name="History" component={HistoryScreen}  />
    </Stack.Navigator>
  );
};

export default AppNavigator;
