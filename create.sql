-- Create the Mood table
CREATE TABLE Mood (
    mood INTEGER PRIMARY KEY,
    notes TEXT,
    active INTEGER  -- Use 0 for FALSE, 1 for TRUE
);

-- Create the Menstrual table
CREATE TABLE Menstrual (
    id INTEGER PRIMARY KEY,
    truefalse INTEGER,  -- Use 0 for FALSE, 1 for TRUE
    notes TEXT
);

-- Create the FitnessToDo table
CREATE TABLE FitnessToDo (
    item_key INTEGER PRIMARY KEY,
    day_of_week TEXT,   -- Day of the week as text
    tasks TEXT,         -- Store tasks as a JSON-like string
    done INTEGER,       -- Use 0 for FALSE, 1 for TRUE
    active INTEGER      -- Use 0 for FALSE, 1 for TRUE
);

-- Create the FitnessItems table
CREATE TABLE FitnessItems (
    item_key INTEGER,
    item TEXT,
    done INTEGER,       -- Use 0 for FALSE, 1 for TRUE
    PRIMARY KEY (item_key, item),
    FOREIGN KEY (item_key) REFERENCES FitnessToDo(item_key)
);

-- Create the Meal table
CREATE TABLE Meal (
    meal_key INTEGER PRIMARY KEY,
    eaten INTEGER,       -- Use 0 for FALSE, 1 for TRUE
    day_of_week TEXT,
    notes TEXT,
    active INTEGER       -- Use 0 for FALSE, 1 for TRUE
);

-- Create the MealItems table
CREATE TABLE MealItems (
    meal_key INTEGER,
    item TEXT,
    eaten INTEGER,       -- Use 0 for FALSE, 1 for TRUE
    PRIMARY KEY (meal_key, item),
    FOREIGN KEY (meal_key) REFERENCES Meal(meal_key)
);

-- Create the RoutineWeek table
CREATE TABLE RoutineWeek (
    id INTEGER PRIMARY KEY,
    day_of_week TEXT,
    fitness_to_do INTEGER,
    meal_reference INTEGER,
    FOREIGN KEY (fitness_to_do) REFERENCES FitnessToDo(item_key),
    FOREIGN KEY (meal_reference) REFERENCES Meal(meal_key)
);

-- Create the DayContents table
CREATE TABLE DayContents (
    day TEXT PRIMARY KEY,   -- SQLite stores dates as strings in ISO format (YYYY-MM-DD HH:MM:SS)
    routine_week INTEGER,
    mood INTEGER,
    menstrual INTEGER,
    fitness_done INTEGER,   -- Use 0 for FALSE, 1 for TRUE
    meal_eaten INTEGER,     -- Use 0 for FALSE, 1 for TRUE
    FOREIGN KEY (routine_week) REFERENCES RoutineWeek(id),
    FOREIGN KEY (mood) REFERENCES Mood(mood),
    FOREIGN KEY (menstrual) REFERENCES Menstrual(id)
);