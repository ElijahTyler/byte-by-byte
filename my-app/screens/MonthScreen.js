import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

// Get the screen width to calculate day box sizes
const screenWidth = Dimensions.get('window').width;

const moodColors = {
  1: '#ff9999',
  2: '#ffcc99',
  3: '#ffff99',
  4: '#ccff99',
  5: '#99ff99',
};

export default function MonthViewScreen() {
  const [selectedDays, setSelectedDays] = useState({});
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthTitle, setMonthTitle] = useState('');

  const moodData = { // eventually will come from database! :D
    1: 3,
    2: 2,
    12: 5,
    15: 1,
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  useEffect(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const daysArray = Array.from({ length: firstDayOfMonth }, () => null)
      .concat(Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1));

    setDaysInMonth(daysArray);
    setMonthTitle(currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }));
  }, [currentYear, currentMonth]);

  const getMoodColor = (day) => {
    const mood = moodData[day];
    return mood ? moodColors[mood] : '#e0e0e0';
  };

  const boxSize = screenWidth / 7 - 10; // Divide screen width by 7, adjust for padding

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Byte by Byte</Text>
      <Text style={styles.monthTitle}>{monthTitle}</Text>

      <View style={styles.weekRow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayLabel) => (
          <Text key={dayLabel} style={styles.dayLabel}>{dayLabel}</Text>
        ))}
      </View>

      <FlatList
        data={daysInMonth}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayBox,
              { backgroundColor: item ? getMoodColor(item) : 'transparent', width: boxSize, height: boxSize },
            ]}
            disabled={!item}
          >
            <Text style={styles.dayText}>{item || ''}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.calendarContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
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
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - 40, // Account for container padding
    marginBottom: 10,
  },
  dayLabel: {
    width: screenWidth / 7 - 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  calendarContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  dayBox: {
    margin: 2,
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
