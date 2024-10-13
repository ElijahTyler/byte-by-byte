import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Button } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteData, saveDayContents, loadDayContents, saveMood, loadMood, saveMenstrual, loadMenstrual, saveRoutineWeek, loadRoutineWeek, saveFitnessToDo, loadFitnessToDo, saveMeal, loadMeal, loadMoodsForMonth } from './database';
import { SettingsContext } from './SettingsContext';  // Import SettingsContext

export default function HomeScreen() {
    // Use the SettingsContext to get the global toggle states
    
const handleSaveMenstrual = async (selection) => {
    const formattedDate = formatDate(selectedDate);
    console.log(`Saving menstrual data for date: ${formattedDate}`);
    try {
        await saveMenstrual(formattedDate, selection);
        console.log(`Menstrual data saved for ${formattedDate}: ${selection}`);
    } catch (error) {
        console.error('Error saving menstrual data:', error);
    }
};
    
const {
        isMoodEnabled,
        isMenstrualEnabled,
        isMealEnabled,
        isFitnessEnabled
    } = useContext(SettingsContext);

    const [selectedDate, setSelectedDate] = useState(new Date());  // State for the currently selected date
    const formatDate = (date) => date.toISOString().split('T')[0];  // Helper function to format date to 'YYYY-MM-DD'
    const formattedDate = formatDate(selectedDate);  // Format the selected date
    
    // State for tasks, ingredients, mood, and notes
    const [tasks, setTasks] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedMood, setSelectedMood] = useState(null);  // Track selected mood
    const [notes, setNotes] = useState('');  // Track notes

    // State for menstrual section selection
    const [menstrualSelection, setMenstrualSelection] = useState(null);

    // Load menstrual data when selectedDate changes
    useEffect(() => {
        const loadMenstrualData = async () => {
            const formattedDate = formatDate(selectedDate);
            const savedMenstrual = await loadMenstrual(formattedDate);
            console.log('Loaded menstrual data:', savedMenstrual);
            if (savedMenstrual && savedMenstrual.isMenstruating) {
                setMenstrualSelection(savedMenstrual.isMenstruating);  // Update the state with the saved data
            } else {
                setMenstrualSelection(null);  // Clear the state if no data exists for the day
            }
        };
        loadMenstrualData();  // Call the function whenever the selectedDate changes
    }, [selectedDate]);  // Re-run this effect every time the selected date changes

    // Fetch tasks, ingredients, mood, and notes whenever the selectedDate changes
    useEffect(() => {
        const initializeApp = async () => {
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

            const loadedIngredients = await AsyncStorage.getItem('ingredients_list');
            const parsedIngredients = loadedIngredients ? JSON.parse(loadedIngredients) : [];
            setIngredients(parsedIngredients);

            // Fetch the mood and notes for the selected day
            const moodData = await loadMood(formattedDate);
            if (moodData) {
                setSelectedMood(moodData.mood);  // Update the mood
                setNotes(moodData.notes);        // Update the notes
            } else {
                setSelectedMood(null);  // Clear mood if no data exists for the selected day
                setNotes('');           // Clear notes if no data exists for the selected day
            }

            // Fetch the menstrual cycle selection for the selected day
            const menstrualData = await loadMenstrual(formattedDate);
            if (menstrualData) {
                saveMenstrual(menstrualData.selection);  // Update the menstrual selection
            }
        };

        initializeApp(); // Call the initialization function
    }, [selectedDate]);  // Re-fetch tasks, ingredients, mood, and notes whenever the selectedDate changes

    // Function to save mood and notes
    const handleSaveMood = async () => {
        if (selectedMood) {
            console.log(`Saving mood and notes for date: ${formattedDate}`);
            await saveMood(formattedDate, selectedMood, notes, true);  // Save both mood and notes
            alert('Mood and notes saved successfully!');
        } else {
            alert('Please select a mood before saving.');
        }
    };

    // Function to toggle task completion
    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Function to toggle the ingredients consumed today
    const toggleIngredient = async (id) => {
        const updatedIngredients = ingredients.map(item =>
            item.id === id ? { ...item, consumed: !item.consumed } : item  // Only update the item with the matching id
        );
        setIngredients(updatedIngredients);
        await AsyncStorage.setItem('ingredients_list', JSON.stringify(updatedIngredients));  // Save updated ingredients
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
                    {selectedDate.toDateString() === new Date().toDateString() ? "Hello👋 \n Today is" : "Now viewing"} {selectedDate.toDateString()} {/* Display the selected date */}
                    </Text>
                </View>

                {/* Conditionally render Mood Section based on global toggle */}
                {isMoodEnabled && (
                    <View style={styles.section}>
                        
                        <Text style={styles.sectionTitle}> <Image source={require('../icons/mood.png')} style={styles.section_icon} /> Mood</Text>
                        {/* Mood selection icons */}
                        
                        <View style={styles.moodOptions}>
                            <TouchableOpacity onPress={() => setSelectedMood(5)}>
                                <Image 
                                    source={require('../icons/5.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 5 && styles.selectedIcon
                                    ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedMood(4)}>
                                <Image 
                                    source={require('../icons/4.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 4 && styles.selectedIcon
                                    ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedMood(3)}>
                                <Image 
                                    source={require('../icons/3.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 3 && styles.selectedIcon
                                    ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedMood(2)}>
                                <Image 
                                    source={require('../icons/2.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 2 && styles.selectedIcon
                                    ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedMood(1)}>
                                <Image 
                                    source={require('../icons/1.png')} 
                                    style={[
                                        styles.icon, 
                                        selectedMood === 1 && styles.selectedIcon
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
                        {/* Save Button */}
                        <View style={styles.buttonContainer}>
                            <Button title="Save Mood and Notes" onPress={handleSaveMood} />
                        </View>
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
                                    menstrualSelection === 'Yes' ? styles.selectedRadioButton : null,
                                ]}
                                onPress={async () => {
                                    setMenstrualSelection('Yes');
                                    handleSaveMenstrual('Yes');
                                }}
                            >
                                <Text>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    menstrualSelection === 'No' ? styles.selectedRadioButton : null,
                                ]}
                                onPress={async () => {
                                    setMenstrualSelection('No'); 
                                    handleSaveMenstrual('No');
                                }}
                            >
                                <Text>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Add Yesterday and Tomorrow buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.radioButton} onPress={goToYesterday}>
                        <Text>Yesterday</Text>
                    </TouchableOpacity>
                    {selectedDate.toDateString() !== new Date().toDateString() && (
                        <TouchableOpacity style={styles.radioButton} onPress={() => setSelectedDate(new Date())}>
                            <Text>Today</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.radioButton} onPress={goToTomorrow}>
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
    yesterdayButton: {
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    todayButton: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    tomorrowButton: {
        flex: 1,
        alignItems: 'flex-end',
        paddingHorizontal: 20,
    },
    button: {        
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
    moodOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    icon: {
        width: 40,
        height: 40,
    },
    selectedIcon: {
        width: 60,
        height: 60,
    },
    textBox: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
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
        textDecorationLine: 'line-through',
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
        backgroundColor: '#d3d3d3',  // Grey background for selected button
    },
    section_icon: {
        width: 24,
        height: 24,
        //marginHorizontal: 10,  // Adjust spacing between icons
    },
});