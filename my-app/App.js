import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';  // Import HomeScreen
import { View, Text, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';




const Stack = createStackNavigator();

function CustomHeader({ navigation }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Byte by Byte</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CrisisScreen')}>
        <SvgUri width="24" height="24" uri="../icons/alert-triangle.svg" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
        <SvgUri width="24" height="24" uri="../icons/sliders.svg" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
        <Text>Day</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>Week</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>Month</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ header: (props) => <CustomHeader {...props} /> }}
        />
        {/* Add more screens here if needed */}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}