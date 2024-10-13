import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';  // Import HomeScreen
import Settings from './screens/Settings';  // Import SettingsScreen
import CrisisScreen from './screens/CrisisScreen';  // Import CrisisScreen
import MonthScreen from './screens/MonthScreen';  // Import MonthScreen
import FitnessSet from './screens/FitnessSet';
import MealAdd from './screens/MealAdd';
import { MealProvider } from './screens/mealContext';
import { SettingsProvider } from './screens/SettingsContext';


import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Stack = createStackNavigator();

function CustomHeader({ navigation }) {
  return (
    <View style={styles.header}>
      {/* Crisis Button (Alert Icon) */}
      <TouchableOpacity onPress={() => navigation.navigate('CrisisScreen')}>
        <Image source={require('./icons/alert.png')} style={styles.icon} />
      </TouchableOpacity>
      {/* App Title takes you to home screen as well */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.title}>Byte by Byte</Text>
      </TouchableOpacity>
      {/* Tabs (Day, Week, Month) */}
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('MonthScreen')}>
        <Text>Month</Text>
      </TouchableOpacity>
      {/* Settings Button (Settings Icon) */}
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Image source={require('./icons/settings.png')} style={styles.icon} />
      </TouchableOpacity>

      
    </View>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <MealProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,  // Apply custom header to all screens
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="CrisisScreen" component={CrisisScreen} />
        <Stack.Screen name="MonthScreen" component={MonthScreen} />
        <Stack.Screen name="FitnessSet" component={FitnessSet} />
        <Stack.Screen name="MealAdd" component={MealAdd} />
        {/* Add more screens here as needed */}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    </MealProvider>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,  
    backgroundColor: '#6e9f51',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,  // Adjust spacing between icons
  },
  tab: {
    marginLeft: 10,
  },
});