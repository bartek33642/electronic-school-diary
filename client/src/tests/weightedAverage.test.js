import { calculateWeightedAverage } from "../dependenciesAndRequirements/weightedAverage";

describe('calculateWeightedAverage', () => {
  test('returns 0 for an empty array of grades', () => {
    // Given: An empty array of grades
    const grades = [];
    const weights = [1, 2, 3];

    // When: calculateWeightedAverage is called
    const result = calculateWeightedAverage(grades, weights);

    // Then: The result should be 0
    expect(result).toBe(0);
  });

  test('returns 0 when the lengths of grades and weights are not equal', () => {
    // Given: Arrays of grades and weights of different lengths
    const grades = [1, 2, 3];
    const weights = [1, 2];

    // When: calculateWeightedAverage is called
    const result = calculateWeightedAverage(grades, weights);

    // Then: The result should be 0
    expect(result).toBe(0);
  });

  test('calculates the weighted average for arrays of grades and weights', () => {
    // Given: Arrays of grades and weights
    const grades = [1, 2, 3];
    const weights = [1, 2, 3];

    // When: calculateWeightedAverage is called
    const result = calculateWeightedAverage(grades, weights);

    // Then: The result should be the weighted average of the grades
    expect(result).toBeCloseTo(2.33, 2); 
});
});
