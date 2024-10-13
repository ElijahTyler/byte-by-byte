import PouchDB from 'pouchdb-react-native';
import SQLiteAdapter from 'pouchdb-adapter-react-native-sqlite';

// Add the SQLite adapter to PouchDB
PouchDB.plugin(SQLiteAdapter);

// Initialize PouchDB with the SQLite adapter
const db = new PouchDB('mood_tracking', { adapter: 'react-native-sqlite' });

// Function to add a new DayContents document
export const addDayContents = async (date, routine_week, mood, menstrual, fitness_done, meal_eaten) => {
  const doc = {
    _id: `daycontents_${date}`,  // Use the date as the ID
    date: date,
    routine_week: routine_week,  // Reference to RoutineWeek
    mood: mood,                  // Reference to Mood
    menstrual: menstrual,        // Reference to Menstrual
    fitness_done: fitness_done,  // Boolean
    meal_eaten: meal_eaten       // Boolean
  };

  try {
    const result = await db.put(doc);
    console.log('DayContents added:', result);
  } catch (err) {
    console.error('Error adding DayContents:', err);
  }
};

// Function to add a new Mood document
export const addMood = async (mood, notes, active) => {
  const doc = {
    _id: `mood_${Date.now()}`,  // Use timestamp for unique ID
    mood: mood,
    notes: notes,
    active: active
  };

  try {
    const result = await db.put(doc);
    console.log('Mood added:', result);
  } catch (err) {
    console.error('Error adding Mood:', err);
  }
};

// Function to retrieve a DayContents document by date
export const getDayContents = async (date) => {
  try {
    const doc = await db.get(`daycontents_${date}`);
    console.log('DayContents retrieved:', doc);
    return doc;
  } catch (err) {
    console.error('Error retrieving DayContents:', err);
  }
};

// Function to retrieve a Mood document by ID
export const getMood = async (moodId) => {
  try {
    const doc = await db.get(moodId);
    console.log('Mood retrieved:', doc);
    return doc;
  } catch (err) {
    console.error('Error retrieving Mood:', err);
  }
};

// Function to update a Mood document
export const updateMood = async (moodId, newNotes) => {
  try {
    // Fetch the document first
    const doc = await db.get(moodId);
    
    // Modify the notes
    doc.notes = newNotes;
    
    // Save the updated document
    const result = await db.put(doc);
    console.log('Mood updated:', result);
  } catch (err) {
    console.error('Error updating Mood:', err);
  }
};

// Function to delete a document by ID
export const deleteDocument = async (docId) => {
  try {
    // Fetch the document first to get the revision (_rev)
    const doc = await db.get(docId);
    
    // Delete the document
    const result = await db.remove(doc._id, doc._rev);
    console.log('Document deleted:', result);
  } catch (err) {
    console.error('Error deleting document:', err);
  }
};

// Function to get mood data from year and month
export const getMoodData = async (year, month) => {
  const startKey = `daycontents_${year}-${month.toString().padStart(2, '0')}-01`;
  const endKey = `daycontents_${year}-${(month + 1).toString().padStart(2, '0')}-01`;

  try {
    const result = await db.allDocs({
      include_docs: true,
      startkey: startKey,
      endkey: endKey
    });

    const moodData = {};
    result.rows.forEach((row) => {
      moodData[row.doc.date.split('-')[2]] = row.doc.mood;
    });

    console.log('Mood data retrieved:', moodData);
    return moodData;
  } catch (err) {
    console.error('Error retrieving mood data:', err);
  }
};