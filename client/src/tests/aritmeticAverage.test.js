import { calculateAritmeticAverage } from "../dependenciesAndRequirements/aritmeticAverage";

describe('calculateAritmeticAverage', () => {
    test('returns 0 for an empty array', () => {
      // Given: An empty array
      const grades = [];
  
      // When: calculateAritmeticAverage is called
      const result = calculateAritmeticAverage(grades);
  
      // Then: The result should be 0
      expect(result).toBe(0);
    });
  
    test('calculates the average for an array of numbers', () => {
      // Given: An array of numbers
      const grades = [1, 2, 3, 4, 5];
  
      // When: calculateAritmeticAverage is called
      const result = calculateAritmeticAverage(grades);
  
      // Then: The result should be the average of the numbers
      expect(result).toBe(3);
    });
  });
