import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CrisisScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Animated GIF */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../icons/breathing.gif')}  // Make sure the path is correct
          style={styles.breathingGif}
        />
      </View>

      {/* Crisis label */}
      <Text style={styles.crisisLabel}>Crisis #15</Text>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingGif: {
    width: 200,  // Adjust width as needed
    height: 200,  // Adjust height as needed
  },
  crisisLabel: {
    fontSize: 20,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  hardButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  coolButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
