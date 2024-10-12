-- Create the database
CREATE DATABASE IF NOT EXISTS MoodTrackingApp;
USE MoodTrackingApp;

-- Create the Mood table
CREATE TABLE Mood (
    mood INT PRIMARY KEY,
    notes VARCHAR(255),
    active BOOLEAN
);

-- Create the Menstrual table
CREATE TABLE Menstrual (
    id INT PRIMARY KEY AUTO_INCREMENT,
    truefalse BOOLEAN,
    notes VARCHAR(255)
);

-- Create the FitnessToDo table
CREATE TABLE FitnessToDo (
    item_key INT PRIMARY KEY AUTO_INCREMENT,
    day_of_week VARCHAR(10),   -- Planned day of the week for the activity
    tasks JSON,                -- Store multiple tasks as JSON, e.g., leg day
    done BOOLEAN,
    active BOOLEAN
);

-- Create the FitnessItems table (if you still need more detailed tracking of individual items)
CREATE TABLE FitnessItems (
    item_key INT,
    item VARCHAR(255),
    done BOOLEAN,
    PRIMARY KEY (item_key, item),
    FOREIGN KEY (item_key) REFERENCES FitnessToDo(item_key)
);

-- Create the Meal table
CREATE TABLE Meal (
    meal_key INT PRIMARY KEY AUTO_INCREMENT,
    eaten BOOLEAN,
    day_of_week VARCHAR(10),
    notes VARCHAR(255),
    active BOOLEAN
);

-- Create the MealItems table
CREATE TABLE MealItems (
    meal_key INT,
    item VARCHAR(255),
    eaten BOOLEAN,
    PRIMARY KEY (meal_key, item),
    FOREIGN KEY (meal_key) REFERENCES Meal(meal_key)
);

-- Create the RoutineWeek table for weekly templates
CREATE TABLE RoutineWeek (
    id INT PRIMARY KEY AUTO_INCREMENT,
    day_of_week VARCHAR(10),   -- Example: 'Monday', 'Tuesday'
    fitness_to_do INT,         -- Reference to planned fitness activity
    meal_reference INT,        -- Reference to planned meal
    FOREIGN KEY (fitness_to_do) REFERENCES FitnessToDo(item_key),
    FOREIGN KEY (meal_reference) REFERENCES Meal(meal_key)
);

-- Create the DayContents table for daily tracking of actual activities
CREATE TABLE DayContents (
    day DATETIME PRIMARY KEY,
    routine_week INT,          -- Reference to the RoutineWeek template
    mood INT,                  -- Actual mood tracked
    menstrual INT,             -- Menstrual status on the day
    fitness_done BOOLEAN,      -- Did the user complete the fitness task?
    meal_eaten BOOLEAN,        -- Did the user eat the planned meal?
    FOREIGN KEY (routine_week) REFERENCES RoutineWeek(id),
    FOREIGN KEY (mood) REFERENCES Mood(mood),
    FOREIGN KEY (menstrual) REFERENCES Menstrual(id)
);

-- Optional: create indexes for faster queries on mood and day
CREATE INDEX idx_mood_active ON Mood (active);
CREATE INDEX idx_day_daycontents ON DayContents (day);