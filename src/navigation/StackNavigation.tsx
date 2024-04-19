import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/Login';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};
