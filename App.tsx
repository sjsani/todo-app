import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import AddTaskScreen from './src/screens/AddTask';
import { ThemeProvider } from './src/context/ThemeContext';
import EditTask from './src/screens/EditTask';
import ViewTaskScreen from './src/screens/ViewTask';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="EditTask" component={EditTask} />
          <Stack.Screen name="ViewTask" component={ViewTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}