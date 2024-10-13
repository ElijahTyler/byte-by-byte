import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { saveRoutineWeek, loadRoutineWeek } from './database'; // Import database functions
import { MaterialIcons } from '@expo/vector-icons'; // For delete icon

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const FitnessSet = () => {
  const [routines, setRoutines] = useState({});
  const [currentDay, setCurrentDay] = useState(daysOfWeek[0]);
  const [currentTask, setCurrentTask] = useState('');

  // Load routines when the component mounts
  useEffect(() => {
    const loadRoutines = async () => {
      try {
        const loadedRoutines = {};
        for (const day of daysOfWeek) {
          const routine = await loadRoutineWeek(day);
          loadedRoutines[day] = Array.isArray(routine?.fitnessToDo) ? routine.fitnessToDo : []; // Ensure an array
        }
        setRoutines(loadedRoutines);
      } catch (error) {
        console.error('Error loading routines:', error);
      }
    };

    loadRoutines();
  }, []);

  // Save the current task for the selected day
  const saveTask = async () => {
    if (currentTask.trim()) {
      const updatedTasks = [...(routines[currentDay] || []), currentTask]; // Append task to the day's list
      const updatedRoutines = { ...routines, [currentDay]: updatedTasks };
      setRoutines(updatedRoutines);
      try {
        await saveRoutineWeek(currentDay, updatedTasks, ''); // Save the fitness routine to the database
        setCurrentTask(''); // Clear input field after saving
      } catch (error) {
        console.error(`Error saving task for ${currentDay}:`, error);
      }
    }
  };

  // Delete a task from the list
  const deleteTask = async (taskIndex) => {
    const updatedTasks = routines[currentDay].filter((_, index) => index !== taskIndex); // Remove the task by index
    const updatedRoutines = { ...routines, [currentDay]: updatedTasks };
    setRoutines(updatedRoutines);
    try {
      await saveRoutineWeek(currentDay, updatedTasks, ''); // Save the updated task list
    } catch (error) {
      console.error(`Error deleting task from ${currentDay}:`, error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Your Fitness Routine</Text>

      {/* Select the day of the week */}
      <View style={styles.dayButtonContainer}>
        <FlatList
          horizontal
          data={daysOfWeek}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setCurrentDay(item)}
              style={[styles.dayButton, currentDay === item && styles.selectedDayButton]}
            >
              <Text style={[styles.dayButtonText, currentDay === item && styles.selectedDayButtonText]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      {/* Input field and saved tasks displayed side-by-side */}
      <View style={styles.inputAndTasksContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Enter task for ${currentDay}`}
            value={currentTask}
            onChangeText={setCurrentTask}
          />
          <TouchableOpacity onPress={saveTask} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        {/* Show saved tasks for the selected day */}
        <View style={styles.tasksContainer}>
          <FlatList
            data={routines[currentDay] || []} // Show tasks for the current day, ensure it's an array
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.routineContainer}>
                <Text style={styles.taskText}>{item}</Text>
                <TouchableOpacity onPress={() => deleteTask(index)}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text>No tasks added yet.</Text>} // Message if no tasks
          />
        </View>
      </View>

      {/* Show saved routines for the entire week */}
      <FlatList
        data={Object.entries(routines)}
        keyExtractor={([day]) => day}
        renderItem={({ item: [day, tasks] }) => (
          <View style={styles.weeklyRoutineContainer}>
            <Text style={styles.dayText}>{day}</Text>
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task, index) => <Text key={index} style={styles.routineText}>- {task}</Text>)
            ) : (
              <Text style={styles.noTaskText}>No tasks set for {day}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f2ee',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dayButtonContainer: {
    marginBottom: 15,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedDayButton: {
    backgroundColor: '#b8d8ba',
  },
  dayButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDayButtonText: {
    color: '#fff',
  },
  separator: {
    width: 10,
  },
  inputAndTasksContainer: {
    flexDirection: 'row', // Place input and task list side by side
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#2E4052',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasksContainer: {
    flex: 1,
    maxHeight: 200, // Limit the height of the task list
  },
  routineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  weeklyRoutineContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  routineText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  noTaskText: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
  },
});

export default FitnessSet;