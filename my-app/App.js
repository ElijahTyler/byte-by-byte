import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as SQLite from 'react-native-sqlite-storage';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

// Enable debugging for react-native-sqlite-storage
// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

export default function App() {
  const [db, setDb] = useState(null);
  const [tables, setTables] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // Path where the database should be stored in internal storage
  const databaseUri = `${FileSystem.documentDirectory}SQLite/MoodTrackingApp.db`;

  // Function to check if the database exists in internal storage
  const copyDatabaseIfNeeded = async () => {
    const fileInfo = await FileSystem.getInfoAsync(databaseUri);
    if (!fileInfo.exists) {
      console.log('Database does not exist, copying from assets...');
      try {
        // Make the directory where SQLite databases are stored
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });

        // Copy the database from assets to the internal storage
        const asset = Asset.fromModule(require('./assets/MoodTrackingApp.db')); // Ensure this path is correct
        await FileSystem.downloadAsync(asset.uri, databaseUri);

        console.log('Database copied successfully to:', databaseUri);
      } catch (error) {
        console.error('Error copying database:', error);
        setErrorMessage('Failed to copy the database from assets.');
      }
    } else {
      console.log('Database already exists in internal storage:', databaseUri);
    }
  };

  // Initialize the database from internal storage
  const initDb = async () => {
    try {
      const db = await SQLite.openDatabase({
        name: 'MoodTrackingApp.db',
        location: 'default',  // Default path for Android
      });
      setDb(db);
      console.log('Database opened successfully.');
    } catch (error) {
      console.error('Failed to open database:', error);
      setErrorMessage('Failed to open database. Check the path or file.');
    }
  };

  // Function to fetch tables in the database
  const getTables = async () => {
    if (!db) {
      setErrorMessage('Database is not initialized.');
      return;
    }

    try {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT name FROM sqlite_master WHERE type="table";',
          [],
          (tx, results) => {
            const rows = results.rows._array;
            if (rows.length > 0) {
              setTables(rows);
            } else {
              setErrorMessage('No tables found.');
            }
          },
          (tx, error) => {
            console.error('Error fetching tables:', error);
            setErrorMessage('Error fetching tables.');
          }
        );
      });
    } catch (error) {
      console.error('Error during transaction:', error);
      setErrorMessage('Error during transaction.');
    }
  };

  // Run on component mount: copy the database if needed, then initialize it
  useEffect(() => {
    const setupDb = async () => {
      await copyDatabaseIfNeeded();
      await initDb();
    };
    setupDb();
  }, []);

  return (
    <View style={styles.container}>
      <Text>SQLite Database Test</Text>

      <Button title="Fetch Tables" onPress={getTables} />

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <Text style={styles.subtitle}>Tables in Database:</Text>
      {tables.length > 0 ? (
        tables.map((table, index) => <Text key={index}>{table.name}</Text>)
      ) : (
        <Text>No tables found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
  },
  subtitle: {
    marginTop: 20,
  },
});
