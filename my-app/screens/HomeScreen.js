import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Checkbox from 'expo-checkbox'; 
import { TextInput } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
    // State for tasks
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Take a walk', completed: false },
        { id: 2, title: 'Run for 3 miles', completed: false },
        { id: 3, title: 'Bicep curls 15 reps', completed: false }
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

    return (
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
                        {/* Image 5.png (VeryHappy) */}
                        <Image 
                            source={require('../icons/5.png')} 
                            style={[
                                styles.icon, 
                                selectedMood === 'VeryHappy' && styles.selectedIcon
                            ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedMood('Happy')}>
                        {/* Image 4.png (Happy) */}
                        <Image 
                            source={require('../icons/4.png')} 
                            style={[
                                styles.icon, 
                                selectedMood === 'Happy' && styles.selectedIcon
                            ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedMood('Neutral')}>
                        {/* Image 3.png (Neutral) */}
                        <Image 
                            source={require('../icons/3.png')} 
                            style={[
                                styles.icon, 
                                selectedMood === 'Neutral' && styles.selectedIcon
                            ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedMood('Sad')}>
                        {/* Image 2.png (Sad) */}
                        <Image 
                            source={require('../icons/2.png')} 
                            style={[
                                styles.icon, 
                                selectedMood === 'Sad' && styles.selectedIcon
                            ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedMood('VerySad')}>
                        {/* Image 1.png (VerySad) */}
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
                    <Text>Yes</Text>
                    <Text>No</Text>
                </View>
            </View>

            {/* Meal Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Meal</Text>
                <Text>Check list of what I've eaten</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        width: 50,  // Default size
        height: 50, // Default size
    },
    selectedIcon: {
        width: 70,  // Larger size when selected
        height: 70, // Larger size when selected
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
        justifyContent: 'space-between',
        marginVertical: 10,
    },
});
