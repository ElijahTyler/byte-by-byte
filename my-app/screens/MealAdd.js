import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { saveMeal, loadMeal } from './database'; // Import your database functions
import { MaterialIcons } from '@expo/vector-icons'; // For delete icon

const MealAdd = ({ date }) => {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  // Load existing ingredients when the component is mounted
  useEffect(() => {
    const loadExistingMeals = async () => {
      try {
        const existingMeals = await loadMeal(date);
        console.log(`Loaded ingredients for ${date}:`, existingMeals); // Log loaded ingredients
        setIngredients(existingMeals);
      } catch (error) {
        console.error(`Error loading ingredients for ${date}:`, error); // Log errors, if any
      }
    };
    loadExistingMeals();
  }, [date]);

  // Handle adding a new ingredient
  const addIngredient = async () => {
    if (ingredient.trim()) {
      const newIngredients = [...ingredients, { ingredient, consumed: false }];
      setIngredients(newIngredients);
      try {
        await saveMeal(date, newIngredients); // Update the JSON database with the new ingredient list
        console.log(`Saved ingredients for ${date}:`, newIngredients); // Log saved ingredients
        setIngredient(''); // Clear the input field
      } catch (error) {
        console.error(`Error saving ingredients for ${date}:`, error); // Log errors, if any
      }
    } else {
      console.log('Ingredient input is empty.'); // Log when the input is empty
    }
  };

  // Handle deleting an ingredient from the list
  const deleteIngredient = async (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    try {
      await saveMeal(date, updatedIngredients); // Save the updated ingredient list
      console.log(`Deleted ingredient at index ${index} for ${date}`);
    } catch (error) {
      console.error(`Error deleting ingredient for ${date}:`, error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Ingredients you are watching for</Text>
      
      {/* Input field for adding new ingredients */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter ingredient"
          value={ingredient}
          onChangeText={setIngredient}
          style={styles.input}
        />
        <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* List of ingredients */}
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.ingredientContainer}>
            <Text style={styles.ingredientText}>{item.ingredient}</Text>
            <TouchableOpacity onPress={() => deleteIngredient(index)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyListText}>No ingredients added yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  ingredientText: {
    fontSize: 18,
    color: '#333',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});

export default MealAdd;