import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to clear all data and add default values
export const deleteData = async (date) => {
  // Clear all data from AsyncStorage
  await AsyncStorage.clear();

  // Default tasks and ingredients
  const defaultTasks = [
    { id: 1, title: 'Take a walk', completed: false },
    { id: 2, title: 'Run for 3 miles', completed: false },
    { id: 3, title: 'Bicep curls 15 reps', completed: false }
  ];

  const defaultIngredients = [
    { id: 1, ingredient: 'Dairy', consumed: false },
    { id: 2, ingredient: 'gluten', consumed: false },
    { id: 3, ingredient: 'eggs', consumed: false },
    { id: 4, ingredient: 'soy', consumed: false },
    { id: 5, ingredient: 'shellfish', consumed: false },
    { id: 6, ingredient: 'nuts', consumed: false },
    { id: 7, ingredient: 'fish', consumed: false },
    { id: 8, ingredient: 'wheat', consumed: false },
    { id: 9, ingredient: 'corn', consumed: false },
    { id: 10, ingredient: 'sugar', consumed: false },
    { id: 11, ingredient: 'alcohol', consumed: false },
    { id: 12, ingredient: 'caffeine', consumed: false },
    { id: 13, ingredient: 'salt', consumed: false }
  ];

  // Save default tasks to the database for the given date
  await saveFitnessToDo(date, defaultTasks);

  // Save default ingredients to the database for the given date
  await saveMeal(date, defaultIngredients);

  console.log('Data cleared and default values added');
};

/** 
 * DayContents: Stores mood, menstrual, fitness, and meal information for a specific day.
 * 
 * @param {string} date - The date to store the data for (e.g., '2024-10-12').
 * @param {string} mood - Reference to the mood (e.g., 'mood_2024-10-12').
 * @param {string} menstrual - Reference to the menstrual data (e.g., 'menstrual_2024-10-12').
 * @param {boolean} fitness_done - Whether fitness tasks were completed.
 * @param {boolean} meal_eaten - Whether the meals were eaten.
 */
export const saveDayContents = async (date, mood, menstrual, fitness_done, meal_eaten) => {
  const dayData = {
    date,
    mood,
    menstrual,
    fitness_done,
    meal_eaten
  };
  await AsyncStorage.setItem(`day_${date}`, JSON.stringify(dayData));
};

export const loadDayContents = async (date) => {
  const dayData = await AsyncStorage.getItem(`day_${date}`);
  return dayData != null ? JSON.parse(dayData) : null;
};

/**
 * Mood: Stores the mood for a specific day.
 * 
 * @param {string} date - The date to store the mood for (e.g., '2024-10-12').
 * @param {number} mood - Mood value (1-5 scale).
 * @param {string} notes - Any notes related to the mood.
 * @param {boolean} active - Whether the mood is currently active.
 */
export const saveMood = async (date, mood, notes, active) => {
  const moodData = {
    date,  // Ensure this is 'YYYY-MM-DD' formatted
    mood,
    notes,
    active,
  };
  console.log(`Saving mood for date: ${date}, mood: ${mood}`);  // Log date and mood being saved
  try {
    await AsyncStorage.setItem(`mood_${date}`, JSON.stringify(moodData));
  } catch (error) {
    console.error('Error saving mood:', error);
  }
};

export const loadMood = async (date) => {
  const moodData = await AsyncStorage.getItem(`mood_${date}`);
  return moodData != null ? JSON.parse(moodData) : null;
};

/**
 * Menstrual: Tracks whether menstruation occurred on a specific day.
 * 
 * @param {string} date - The date to store the data for (e.g., '2024-10-12').
 * @param {boolean} isMenstruating - Whether the user is menstruating.
 */
export const saveMenstrual = async (date, isMenstruating) => {
  const menstrualData = {
    date,
    isMenstruating
  };
  console.log(`Saving menstrual data for date: ${date}, menstruating: ${isMenstruating}`);
  await AsyncStorage.setItem(`menstrual_${date}`, JSON.stringify(menstrualData));
};

export const loadMenstrual = async (date) => {
  const menstrualData = await AsyncStorage.getItem(`menstrual_${date}`);
  return menstrualData != null ? JSON.parse(menstrualData) : null;
};

/**
 * RoutineWeek: Stores the routine for a specific day of the week.
 * 
 * @param {string} dayOfWeek - The day of the week (e.g., 'Monday').
 * @param {string} fitnessToDo - Reference to the fitness tasks for the day.
 * @param {string} mealReference - Reference to the meal for the day.
 */
export const saveRoutineWeek = async (dayOfWeek, fitnessToDo, mealReference) => {
  const routineData = {
    dayOfWeek,
    fitnessToDo,
    mealReference
  };
  await AsyncStorage.setItem(`routine_${dayOfWeek}`, JSON.stringify(routineData));
};

export const loadRoutineWeek = async (dayOfWeek) => {
  const routineData = await AsyncStorage.getItem(`routine_${dayOfWeek}`);
  return routineData != null ? JSON.parse(routineData) : null;
};

/**
 * FitnessToDo: Stores fitness tasks for a specific day of the week.
 * 
 * @param {string} dayOfWeek - The day of the week (e.g., 'Thursday').
 * @param {Array} tasks - Array of tasks (e.g., [{ task: 'Run 3 miles', done: false }]).
 */
export const saveFitnessToDo = async (dayOfWeek, tasks) => {
  const fitnessData = {
    dayOfWeek,
    tasks
  };
  await AsyncStorage.setItem(`fitness_${dayOfWeek}`, JSON.stringify(fitnessData));
};

export const loadFitnessToDo = async (dayOfWeek) => {
  const fitnessData = await AsyncStorage.getItem(`fitness_${dayOfWeek}`);
  return fitnessData != null ? JSON.parse(fitnessData) : [];
};

/**
 * Meal: Stores meal data for a specific day of the week.
 * 
 * @param {string} dayOfWeek - The day of the week (e.g., 'Thursday').
 * @param {Array} meals - Array of meal items (e.g., [{ item: 'Chicken', eaten: true }]).
 * @param {boolean} eaten - Whether the meal was eaten or not.
 */
export const saveMeal = async (id, ingredients) => {
  const mealData = {
    id, // Store meal for a specific date
    ingredients, // Array of ingredients, e.g., [{ ingredient: 'Eggs', consumed: false }]
  };
  await AsyncStorage.setItem(`meal_${id}`, JSON.stringify(mealData));
};

export const loadMeal = async (id) => {
  const mealData = await AsyncStorage.getItem(`meal_${id}`);
  return mealData != null ? JSON.parse(mealData).ingredients : []; // Return ingredients array or empty array
};

/**
 * Helper function to load all moods for a given month (e.g., '2024-10').
 * 
 * @param {string} year - The year (e.g., '2024').
 * @param {string} month - The month (e.g., '10').
 * @returns {Array} Array of mood data for the month.
 */
export const loadMoodsForMonth = async (year, month) => {
  const moods = [];
  
  // Get the number of days in the specified month
  const daysInMonth = new Date(year, month, 0).getDate();

  // Loop through the actual days of the month and load each mood
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${month}-${String(day).padStart(2, '0')}`;
    const moodData = await loadMood(date); // Assume loadMood is a function that retrieves mood data for a specific day
    if (moodData) {
      moods.push({ date, mood: moodData.mood });
    }
  }

  return moods;
};