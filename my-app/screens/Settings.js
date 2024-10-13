import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { deleteData } from './database';

export default function SettingsScreen({ navigation }) {
    const [isMoodEnabled, setMoodEnabled] = React.useState(false);
    const [isMenstrualEnabled, setMenstrualEnabled] = React.useState(false);
    const [isMealEnabled, setMealEnabled] = React.useState(false);
    const [isFitnessEnabled, setFitnessEnabled] = React.useState(false);

    return (
        <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Settings</Text>
            {/* Toggle for Fitness */}
        <View style={styles.option}>
            <Text>Fitness</Text>
            <Switch
            value={isFitnessEnabled}
            onValueChange={() => setFitnessEnabled(previousState => !previousState)}
            />
        </View>
        {/* Toggle for Mood */}
        <View style={styles.option}>
            <Text>Mood</Text>
            <Switch
            value={isMoodEnabled}
            onValueChange={() => setMoodEnabled(previousState => !previousState)}
            />
        </View>

        {/* Toggle for Menstrual */}
        <View style={styles.option}>
            <Text>Menstrual</Text>
            <Switch
            value={isMenstrualEnabled}
            onValueChange={() => setMenstrualEnabled(previousState => !previousState)}
            />
        </View>

        {/* Toggle for Meal */}
        <View style={styles.option}>
            <Text>Meal</Text>
            <Switch
            value={isMealEnabled}
            onValueChange={() => setMealEnabled(previousState => !previousState)}
            />
        </View>

        {/* "See My Day" Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FitnessSet')}>
            <Text style={styles.buttonText}>Set Fitness Routine</Text>
        </TouchableOpacity>

        {/* "Add Items" Button */}
        <TouchableOpacity style={styles.button} onPress={() =>  navigation.navigate('MealAdd')}>
            <Text style={styles.buttonText}>Add meal ingredients</Text>
        </TouchableOpacity>

        {/*"delete my data" button */}
        <TouchableOpacity style={styles.button} onPress={() => deleteData()}>
            <Text style={styles.buttonText}>Delete my data</Text> 
        </TouchableOpacity>
        </View>

        
    );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
