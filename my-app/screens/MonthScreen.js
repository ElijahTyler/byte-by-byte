import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect
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

  const formatDate = (date) => {
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);  // Adjust for time zone offset
      return localDate.toISOString().split('T')[0];  // Get YYYY-MM-DD format without time
  };

  // Fetch moods for the current month and store them in the state
  const fetchMoodData = async () => {
    const moods = await loadMoodsForMonth(currentYear.toString(), currentMonth.toString().padStart(2, '0'));
  
    console.log('Loaded moods:', moods);  // Log the loaded moods
  
    const moodMap = moods.reduce((acc, mood) => {
      const day = parseInt(mood.date.split('-')[2], 10);  // Extract the day directly from the date string
      console.log(`Mapping mood for day ${day} (raw date: ${mood.date}) to mood: ${mood.mood}`);
      acc[day] = mood.mood;
      return acc;
    }, {});
  
    setMoodData(moodMap);
  };  

  useFocusEffect(
    React.useCallback(() => {
      // Fetch mood data whenever the screen is focused
      fetchMoodData();
    }, [])
  );

  // Calculate the number of days in the month and handle empty days at the start of the month
  useEffect(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
    const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();

    const daysArray = Array.from({ length: firstDayOfMonth }, () => null)
      .concat(Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1));

    setDaysInMonth(daysArray);
    setMonthTitle(currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }));
  }, [currentYear, currentMonth]);

  // Get the background color for a day based on the mood data
  const getMoodColor = (day) => {
    const mood = moodData[day];
    return mood ? moodColors[mood] : '#e0e0e0'; // Default color if no mood
  };

  const boxSize = screenWidth / 7 - 10;  // Divide screen width by 7, adjust for padding

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Byte by Byte</Text>
      <Text style={styles.monthTitle}>{monthTitle}</Text>

      {/* Weekday Labels */}
      <View style={styles.weekRow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayLabel) => (
          <Text key={dayLabel} style={styles.dayLabel}>{dayLabel}</Text>
        ))}
      </View>

      {/* Calendar Grid */}
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