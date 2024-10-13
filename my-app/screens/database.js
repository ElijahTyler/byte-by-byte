import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteData = async () => {
  // Clear all data from AsyncStorage
  await AsyncStorage.clear();
}

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
    date,
    mood,
    notes,
    active
  };
  await AsyncStorage.setItem(`mood_${date}`, JSON.stringify(moodData));
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
 * @param {string} notes - Any notes related to menstruation.
 */
export const saveMenstrual = async (date, isMenstruating, notes) => {
  const menstrualData = {
    date,
    isMenstruating,
    notes
  };
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
  return fitnessData != null ? JSON.parse(fitnessData) : null;
};

/**
 * Meal: Stores meal data for a specific day of the week.
 * 
 * @param {string} dayOfWeek - The day of the week (e.g., 'Thursday').
 * @param {Array} meals - Array of meal items (e.g., [{ item: 'Chicken', eaten: true }]).
 * @param {boolean} eaten - Whether the meal was eaten or not.
 */
export const saveMeal = async (dayOfWeek, meals, eaten) => {
  const mealData = {
    dayOfWeek,
    meals,
    eaten
  };
  await AsyncStorage.setItem(`meal_${dayOfWeek}`, JSON.stringify(mealData));
};

export const loadMeal = async (dayOfWeek) => {
  const mealData = await AsyncStorage.getItem(`meal_${dayOfWeek}`);
  return mealData != null ? JSON.parse(mealData) : null;
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
  
  // Loop through the days of the month and load each mood
  for (let day = 1; day <= 31; day++) {
    const date = `${year}-${month}-${String(day).padStart(2, '0')}`;
    const moodData = await loadMood(date);
    if (moodData) {
      moods.push({ date, mood: moodData.mood });
    }
  }

  return moods;
};