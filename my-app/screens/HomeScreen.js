import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      {/* App header */}
      <View style={styles.header}>
       
      </View>

      {/* Fitness Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fitness</Text>
        <Text>To-Do List (Set in Settings)</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  navTabs: {
    flexDirection: 'row',
  },
  tab: {
    padding: 10,
    backgroundColor: '#d3d3d3',
    marginLeft: 10,
    borderRadius: 5,
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
  menstrualOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
