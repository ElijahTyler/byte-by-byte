import React, { createContext, useState } from 'react';

// Create a context
export const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [mealUpdated, setMealUpdated] = useState(false);

  return (
    <MealContext.Provider value={{ mealUpdated, setMealUpdated }}>
      {children}
    </MealContext.Provider>
  );
};
