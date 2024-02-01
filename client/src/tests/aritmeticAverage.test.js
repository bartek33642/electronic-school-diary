import { calculateAritmeticAverage } from "../dependenciesAndRequirements/aritmeticAverage";

describe('calculateAritmeticAverage', () => {
    test('returns 0 for an empty array', () => {
      // Given
      const grades = [];
  
      // When
      const result = calculateAritmeticAverage(grades);
  
      // Then
      expect(result).toBe(0);
    });
  
    test('calculates the average for an array of numbers', () => {
      // Given
      const grades = [1, 2, 3, 4, 5];
  
      // When
      const result = calculateAritmeticAverage(grades);
  
      // Then
      expect(result).toBe(3);
    });
  });
