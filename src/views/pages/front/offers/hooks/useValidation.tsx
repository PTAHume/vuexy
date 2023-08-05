import { useState } from "react";

export const useValidation = () => {
  const validateInput = (
    id,
    input,
    filterKey,
    errorField,
    errorMessage,
    propertyName,
    getSuggestionsByFilterKey,
    setError
  ) => {
   
    if (id === null && input.trim() !== "") {
      const suggestions = getSuggestionsByFilterKey(filterKey);
      const matchingItem = suggestions.find(
        (item) => item[propertyName].toLowerCase() === input.toLowerCase()
      );

      if (!matchingItem) {
        setError(errorField, {
          type: "manual",
          message: errorMessage,
        });
        return false;
      }
    }

    return true;
  };

  return { validateInput };
};
