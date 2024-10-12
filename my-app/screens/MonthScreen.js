import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1); // 31 days for demonstration

export default function MonthViewScreen() {
  const [selectedDays, setSelectedDays] = useState({});

  // Function to toggle the color of the day based on selection
  const toggleDayColor = (day) => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: prevState[day] === 'blue' ? 'red' : 'blue', // Toggle between blue and red for now
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Byte by Byte</Text>

      {/* Month Title */}
      <Text style={styles.monthTitle}>October</Text>

      {/* Calendar Grid */}
      <FlatList
        data={daysInMonth}
        numColumns={7} // 7 days in a week
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dayBox, { backgroundColor: selectedDays[item] || '#e0e0e0' }]} // Change color based on selection
            onPress={() => toggleDayColor(item)}
          >
            <Text style={styles.dayText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.calendarContainer}
      />

      {/* Month Title for Next Month */}
      <Text style={styles.monthTitle}>November</Text>

      {/* Calendar Grid for November (optional) */}
      {/* You can replicate the grid for November by creating a similar FlatList */}
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
    textAlign: 'center',
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  calendarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBox: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  dayText: {
    fontSize: 16,
  },
});
