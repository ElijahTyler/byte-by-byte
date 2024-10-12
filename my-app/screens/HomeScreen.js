import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox'; 

export default function HomeScreen({ navigation }) {
    // State for tasks
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Take a walk', completed: false },
        { id: 2, title: 'Run for 3 miles', completed: false },
        { id: 3, title: 'Bicep curls 15 reps', completed: false }
    ]);

    // State for ingredients
    const [ing, setIng] = useState([
        { id: 1, title: 'milk', completed: false },
        { id: 2, title: 'bread', completed: false },
        { id: 3, title: 'eggs', completed: false }
    ]);

    // Function to toggle task completion
    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // State for mood selection
    const [selectedMood, setSelectedMood] = useState(null);  // Track selected mood
    const [notes, setNotes] = useState('');  // Track notes

    // State for menstrual section selection
    const [menstrualSelection, setMenstrualSelection] = useState(null);  // Track Yes or No

    // Function to toggle the ingredients consumed today
    const toggleIng = (id) => {
        setIng(ing.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.homeContainer}>
                {/* App header */}
                <View style={styles.header}>
                </View>

                {/* Fitness Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Fitness</Text>
                    {tasks.map(task => (
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
                    ))}
                </View>

                {/* Mood Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mood</Text>
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

                {/* Menstrual Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Menstrual</Text>
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

                {/* Meal Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ingredients Consumed Today</Text>
                    {ing.map(item => (
                        <View key={item.id} style={styles.taskContainer}>
                            <Checkbox
                                value={item.completed}
                                onValueChange={() => toggleIng(item.id)}
                                style={styles.checkbox}
                            />
                            <Text style={[styles.taskText, item.completed && styles.strikeThrough]}>
                                {item.title}
                            </Text>
                        </View>
                    ))}
                </View>
                {/*add back and next buttons */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => alert('Coming soon')}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('Coming soon')}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    homeContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
        backgroundColor: 'blue',  // Change background color to indicate selection
    },
    radioText: {
        color: 'white',  // White text for better contrast when selected
        fontWeight: 'bold',
    },
});