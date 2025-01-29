import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { TimerProvider } from './src/context/TimerContext';

const App: React.FC = () => {
  return (
    <TimerProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TimerProvider>
  );
};

export default App;
