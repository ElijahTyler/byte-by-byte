import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    { name: 'mydatabase.db', location: 'default' },
    () => {},
    error => { console.error(error); }
);

const App = () => {
    useEffect(() => {
        const createDatabase = async () => {
            try {
                const response = await fetch('create.sql');
                const sql = await response.text();
                db.transaction(tx => {
                    tx.executeSql(sql, [], (tx, results) => {
                        console.log('Database created successfully');
                    }, error => {
                        console.error('Error creating database: ', error);
                    });
                });
            } catch (error) {
                console.error('Error fetching SQL file: ', error);
            }
        };

        createDatabase();
    }, []);

    return (
        <View>
            <Text>SQLite Example</Text>
        </View>
    );
};

export default App;