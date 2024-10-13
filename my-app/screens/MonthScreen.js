import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { loadMoodsForMonth } from './database'; // Import the function from database.js

const screenWidth = Dimensions.get('window').width;

const MonthScreen = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [moodsByDay, setMoodsByDay] = useState({});

  const navigation = useNavigation(); // Initialize navigation

  // Mood colors based on the mood scale
  const moodColors = {
    1: '#FF4C4C',  // Very Bad
    2: '#FF9E4C',  // Bad
    3: '#FFFF4C',  // Neutral
    4: '#B4FF4C',  // Good
    5: '#4CFF4C'   // Very Good
  };

  // Helper function to get the number of days in the current month, padded to align with weekdays
  const getDaysInMonth = (year, month) => {
    const date = new Date(Date.UTC(year, month, 1)); // Ensure we create a UTC date to avoid timezone issues
    const result = [];

    // Get the day of the week of the first day in the month (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = date.getUTCDay(); // Use UTC-based methods to avoid time zone shifts

    // Pad the empty spaces before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      result.push(null);
    }

    // Add all the days of the month
    while (date.getUTCMonth() === month) {
      result.push(new Date(date).getUTCDate()); // Always use UTC methods
      date.setUTCDate(date.getUTCDate() + 1);   // Increment the day
    }

    return result;
  };

  // Updates the days in the month and loads moods when the month changes
  useEffect(() => {
    const year = currentMonth.getUTCFullYear();
    const month = String(currentMonth.getUTCMonth() + 1).padStart(2, '0'); // Ensure month is 2 digits and UTC
    const days = getDaysInMonth(year, currentMonth.getUTCMonth());
    setDaysInMonth(days);

    // Load moods for the month
    const loadMoods = async () => {
      const moods = await loadMoodsForMonth(year, month);
      const moodsByDay = {};

      moods.forEach(({ date, mood }) => {
        const day = new Date(date).getUTCDate(); // Extract day using UTC method to ensure correctness
        moodsByDay[day] = mood;
      });

      setMoodsByDay(moodsByDay);
    };

    loadMoods();
  }, [currentMonth]);

  // Function to handle day click and navigate to HomeScreen
  const handleDayClick = (day) => {
    if (day) {
      // Build the date in 'YYYY-MM-DD' format
      const year = currentMonth.getUTCFullYear();
      const month = String(currentMonth.getUTCMonth() + 1).padStart(2, '0');
      const date = `${year}-${month}-${String(day).padStart(2, '0')}`;

      // Navigate to HomeScreen and pass the selected date
      navigation.navigate('HomeScreen', { selectedDate: date });
    }
  };

  // Function to increment the current month
  const incrementMonth = () => {
    setCurrentMonth((prevMonth) => {
      let newMonth = new Date(prevMonth);
      newMonth.setUTCMonth(newMonth.getUTCMonth() + 1); // Use UTC methods
      return newMonth;
    });
  };

  // Function to decrement the current month
  const decrementMonth = () => {
    setCurrentMonth((prevMonth) => {
      let newMonth = new Date(prevMonth);
      newMonth.setUTCMonth(newMonth.getUTCMonth() - 1); // Use UTC methods
      return newMonth;
    });
  };

  // Helper function to format the month title
  const getMonthTitle = () => {
    const options = { month: 'long', year: 'numeric' };
    return currentMonth.toLocaleDateString(undefined, options);
  };

  // Get mood color based on the day (if mood exists)
  const getMoodColor = (day) => {
    const mood = moodsByDay[day];
    return mood ? moodColors[mood] : 'transparent';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Month Display</Text>

      {/* Month Title */}
      <Text style={styles.monthTitle}>{getMonthTitle()}</Text>

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
              { backgroundColor: item ? getMoodColor(item) : 'transparent', width: screenWidth / 7 - 10, height: screenWidth / 7 - 10 },
            ]}
            disabled={!item}
            onPress={() => handleDayClick(item)} // Handle day click
          >
            <Text style={styles.dayText}>{item || ''}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.calendarContainer}
      />

      {/* Navigation Buttons at the Bottom */}
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={decrementMonth}>
          <Text style={styles.navButtonText}>Previous Month</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={incrementMonth}>
          <Text style={styles.navButtonText}>Next Month</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 20,
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
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  navButtonText: {
    fontSize: 18,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default MonthScreen;