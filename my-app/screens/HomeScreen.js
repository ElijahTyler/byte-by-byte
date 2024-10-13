import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteData, loadFitnessToDo, loadMeal } from './database'; // Import the deleteData function
import { SettingsContext } from './SettingsContext';  // Import SettingsContext

export default function HomeScreen() {
    // Use the SettingsContext to get the global toggle states
    const {
        isMoodEnabled,
        isMenstrualEnabled,
        isMealEnabled,
        isFitnessEnabled
    } = useContext(SettingsContext);

    const [selectedDate, setSelectedDate] = useState(new Date());  // State for the currently selected date

    const formatDate = (date) => date.toISOString().split('T')[0];  // Helper function to format date to 'YYYY-MM-DD'
    
    // State for tasks and ingredients
    const [tasks, setTasks] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    // State for mood selection
    const [selectedMood, setSelectedMood] = useState(null);  // Track selected mood
    const [notes, setNotes] = useState('');  // Track notes

    // State for menstrual section selection
    const [menstrualSelection, setMenstrualSelection] = useState(null);  // Track Yes or No

    // Fetch data based on selectedDate
    useEffect(() => {
        const initializeApp = async () => {
            const formattedDate = formatDate(selectedDate);  // Format selectedDate as 'YYYY-MM-DD'
            const isFirstRun = await AsyncStorage.getItem('isFirstRun');

            if (!isFirstRun) {
                // First run: call deleteData to reset the data and insert defaults
                await deleteData(formattedDate);

                // Set the flag so this doesn't happen again
                await AsyncStorage.setItem('isFirstRun', 'true');
            }

            // Fetch tasks and ingredients for the selected day
            const loadedTasks = await loadFitnessToDo(formattedDate);
            setTasks(loadedTasks);

            const loadedIngredients = await loadMeal(formattedDate);
            setIngredients(loadedIngredients);
        };

        initializeApp(); // Call the initialization function
    }, [selectedDate]);  // Re-fetch tasks and ingredients whenever the selectedDate changes

    // Function to toggle task completion
    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Function to toggle the ingredients consumed today
    const toggleIngredient = (id) => {
        setIngredients(ingredients.map(item =>
            item.id === id ? { ...item, consumed: !item.consumed } : item
        ));
    };

    // Function to handle moving to the previous day (yesterday)
    const goToYesterday = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 1);  // Subtract 1 day
        setSelectedDate(newDate);  // Update selectedDate
    };

    // Function to handle moving to the next day (tomorrow)
    const goToTomorrow = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 1);  // Add 1 day
        setSelectedDate(newDate);  // Update selectedDate
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.homeContainer}>
                {/* App header */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Hello👋 {"\n"} Today is {selectedDate.toDateString()} {/* Display the selected date */}
                    </Text>
                </View>

                {/* Conditionally render Mood Section based on global toggle */}
                {isMoodEnabled && (
                    <View style={styles.section}>
                        
                        <Text style={styles.sectionTitle}> <Image source={require('../icons/mood.png')} style={styles.section_icon} /> Mood</Text>
                        {/* Mood selection icons */}
                        
                        <View style={styles.moodOptions}>
                            <TouchableOpacity onPress={() => setSelectedMood('VeryHappy')}>
                                <Image 
                                    source={require('../icons/5.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 'VeryHappy' && styles.selectedIcon
                                    ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedMood('Happy')}>
                                <Image 
                                    source={require('../icons/4.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 'Happy' && styles.selectedIcon
                                    ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedMood('Neutral')}>
                                <Image 
                                    source={require('../icons/3.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 'Neutral' && styles.selectedIcon
                                    ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedMood('Sad')}>
                                <Image 
                                    source={require('../icons/2.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 'Sad' && styles.selectedIcon
                                    ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedMood('VerySad')}>
                                <Image 
                                    source={require('../icons/1.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 'VerySad' && styles.selectedIcon
                                    ]}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Notes Section */}
                        <Text>Notes</Text>
                        <TextInput
                            style={styles.textBox}
                            multiline
                            placeholder="Write your notes here..."
                            value={notes}
                            onChangeText={(text) => setNotes(text)} 
                        />
                    </View>
                )}

                {/* Conditionally render Fitness Section based on global toggle */}
                {isFitnessEnabled && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}> <Image source={require('../icons/Fitness.png')} style={styles.section_icon} /> Fitness</Text>
                        {tasks && tasks.length > 0 ? (
                        tasks.map(task => (
                                <View key={task.id} style={styles.taskContainer}>
                                <Checkbox
                                    value={task.completed}
                                    onValueChange={() => toggleTask(task.id)}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.taskText, task.completed && styles.strikeThrough]}>
                                    {task.title}
                                </Text>
                                </View>
                            ))
                        ) : (
                        <Text>No tasks available for today.</Text>  // Optional message if no tasks exist
                        )}
                    </View>
                )}

                {/* Conditionally render Meal Section based on global toggle */}
                {isMealEnabled && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}><Image source={require('../icons/meal.png')} style={styles.section_icon} /> Ingredients Consumed Today</Text>
                        {ingredients.map(item => (
                            <View key={item.id} style={styles.taskContainer}>
                                <Checkbox
                                    value={item.consumed}
                                    onValueChange={() => toggleIngredient(item.id)}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.taskText, item.consumed && styles.strikeThrough]}>
                                    {item.ingredient}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Conditionally render Menstrual Section based on global toggle */}
                {isMenstrualEnabled && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}><Image source={require('../icons/PMS.png')} style={styles.section_icon} /> PMS</Text>
                        <View style={styles.menstrualOptions}>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    menstrualSelection === 'Yes' && styles.selectedRadioButton,
                                ]}
                                onPress={() => setMenstrualSelection('Yes')}
                            >
                                <Text>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    menstrualSelection === 'No' && styles.selectedRadioButton,
                                ]}
                                onPress={() => setMenstrualSelection('No')}
                            >
                                <Text>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Add Yesterday and Tomorrow buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={goToYesterday}>
                        <Text>Yesterday</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToTomorrow}>
                        <Text>Tomorrow</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',  // Center the text horizontally
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    homeContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f2ee',
        width: '100%',
    },
    header: {
        justifyContent: 'center',  // Center content vertically
        alignItems: 'center',      // Center content horizontally
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    section: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkbox: {
        marginRight: 10,
    },
    taskText: {
        fontSize: 16,
    },
    strikeThrough: {
        textDecorationLine: 'line-through',  // Strike through the text if the task is completed
    },
    moodOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    icon: {
        width: 40,  // Default size
        height: 40, // Default size
    },
    selectedIcon: {
        width: 60,  // Larger size when selected
        height: 60, // Larger size when selected
    },
    textBox: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        textAlignVertical: 'top',  // For proper multiline behavior
    },
    menstrualOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    radioButton: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRadioButton: {
        backgroundColor: '#b8d8ba',  // Change
    },
    radioText: {
        color: 'white',  // White text for better contrast when selected
        fontWeight: 'bold',
    },
    section_icon: {
        width: 24,
        height: 24,
        //marginHorizontal: 10,  // Adjust spacing between icons
      },
});
