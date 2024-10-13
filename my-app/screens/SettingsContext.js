import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the SettingsContext
export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isMoodEnabled, setMoodEnabled] = useState(true);
    const [isMenstrualEnabled, setMenstrualEnabled] = useState(true);
    const [isMealEnabled, setMealEnabled] = useState(true);
    const [isFitnessEnabled, setFitnessEnabled] = useState(true);

    // Load settings from AsyncStorage when the app starts
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const mood = await AsyncStorage.getItem('isMoodEnabled');
                const menstrual = await AsyncStorage.getItem('isMenstrualEnabled');
                const meal = await AsyncStorage.getItem('isMealEnabled');
                const fitness = await AsyncStorage.getItem('isFitnessEnabled');

                if (mood !== null) setMoodEnabled(JSON.parse(mood));
                if (menstrual !== null) setMenstrualEnabled(JSON.parse(menstrual));
                if (meal !== null) setMealEnabled(JSON.parse(meal));
                if (fitness !== null) setFitnessEnabled(JSON.parse(fitness));
            } catch (error) {
                console.error('Failed to load settings:', error);
            }
        };

        loadSettings();
    }, []);

    // Save settings to AsyncStorage when they change
    useEffect(() => {
        const saveSettings = async () => {
            try {
                await AsyncStorage.setItem('isMoodEnabled', JSON.stringify(isMoodEnabled));
                await AsyncStorage.setItem('isMenstrualEnabled', JSON.stringify(isMenstrualEnabled));
                await AsyncStorage.setItem('isMealEnabled', JSON.stringify(isMealEnabled));
                await AsyncStorage.setItem('isFitnessEnabled', JSON.stringify(isFitnessEnabled));
            } catch (error) {
                console.error('Failed to save settings:', error);
            }
        };

        saveSettings();
    }, [isMoodEnabled, isMenstrualEnabled, isMealEnabled, isFitnessEnabled]);

    return (
        <SettingsContext.Provider
            value={{
                isMoodEnabled,
                setMoodEnabled,
                isMenstrualEnabled,
                setMenstrualEnabled,
                isMealEnabled,
                setMealEnabled,
                isFitnessEnabled,
                setFitnessEnabled
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
