import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SettingsContext } from './SettingsContext';  // Import SettingsContext
import { deleteData } from './database'; // Import deleteData function
import { Image } from 'react-native';

export default function SettingsScreen({ navigation }) {
    // Access the global state from SettingsContext
    const {
        isMoodEnabled, setMoodEnabled,
        isMenstrualEnabled, setMenstrualEnabled,
        isMealEnabled, setMealEnabled,
        isFitnessEnabled, setFitnessEnabled
    } = useContext(SettingsContext);



    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Settings</Text>
            {/* Toggle for Mood */}
            <View style={styles.option}>
                <Text><Image source={require('../icons/mood.png')} style={styles.section_icon} /> Mood</Text>
                <Switch
                    value={isMoodEnabled}
                    onValueChange={setMoodEnabled}
                />
            </View>

            {/* Toggle for Fitness */}
            <View style={styles.option}>
                <Text><Image source={require('../icons/Fitness.png')} style={styles.section_icon} /> Fitness</Text>
                <Switch
                    value={isFitnessEnabled}
                    onValueChange={setFitnessEnabled}
                />
            </View>

            {/* Toggle for Meal */}
            <View style={styles.option}>
                <Text><Image source={require('../icons/meal.png')} style={styles.section_icon} /> Meal</Text>
                <Switch
                    value={isMealEnabled}
                    onValueChange={setMealEnabled}
                />
            </View>

            {/* Toggle for Menstrual */}
            <View style={styles.option}>
                <Text><Image source={require('../icons/PMS.png')} style={styles.section_icon} /> Menstrual</Text>
                <Switch
                    value={isMenstrualEnabled}
                    onValueChange={setMenstrualEnabled}
                />
            </View>

            {/* "See My Day" Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FitnessSet')}>
            <Text style={styles.buttonText}>Set Fitness Routine</Text>
            </TouchableOpacity>

            {/* "Add Items" Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MealAdd')}>
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
        backgroundColor: '#f0f2ee',
    },
    section_icon: {
        width: 10,
        height: 10,
        marginHorizontal: 10,  // Adjust spacing between icons
        padding: 10,
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
        backgroundColor: '#2E4052',
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
