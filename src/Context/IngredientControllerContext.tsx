import React from 'react';

export const IngredientControllerContext = React.createContext({
    addIngredient: (name: string) => {},
    removeIngredient: (name: string) => {}
});