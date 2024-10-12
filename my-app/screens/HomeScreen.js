import React, { useState } from 'react';  // Import useState here
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox'; 

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
                    <Text>O</Text>
                    <Text>O</Text>
                    <Text>O</Text>
                    <Text>O</Text>
                    <Text>O</Text>
                </View>
                <Text>Notes: Selection: {/** Add any logic here */}</Text>
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
    menstrualOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
});