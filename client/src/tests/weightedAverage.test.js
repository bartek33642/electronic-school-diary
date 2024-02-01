import { calculateWeightedAverage } from "../dependenciesAndRequirements/weightedAverage";

describe('calculateWeightedAverage', () => {
  test('returns 0 for an empty array of grades', () => {
    // Given
    const grades = [];
    const weights = [1, 2, 3];

    // When
    const result = calculateWeightedAverage(grades, weights);

    // Then
    expect(result).toBe(0);
  });

  test('returns 0 when the lengths of grades and weights are not equal', () => {
    // Given
    const grades = [1, 2, 3];
    const weights = [1, 2];

    // When
    const result = calculateWeightedAverage(grades, weights);

    // Then
    expect(result).toBe(0);
  });

  test('calculates the weighted average for arrays of grades and weights', () => {
    // Given
    const grades = [1, 2, 3];
    const weights = [1, 2, 3];

    // When
    const result = calculateWeightedAverage(grades, weights);

    // Then
    expect(result).toBeCloseTo(2.33, 2); 
});
});
