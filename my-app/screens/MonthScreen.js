import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { loadMoodsForMonth } from './database';

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
  const [moodData, setMoodData] = useState({}); // State to store mood data

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Get month in 'MM' format

  // Fetch moods for the current month and store them in the state
  useEffect(() => {
    const fetchMoodData = async () => {
      const moods = await loadMoodsForMonth(currentYear.toString(), currentMonth.toString().padStart(2, '0'));
      const moodMap = moods.reduce((acc, mood) => {
        const day = new Date(mood.date).getDate();
        acc[day] = mood.mood;
        return acc;
      }, {});
      setMoodData(moodMap);
    };

    fetchMoodData();
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
    const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();

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
      <Text style={styles.title}>Month Display</Text>
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
    backgroundColor: '#f0f2ee',
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
