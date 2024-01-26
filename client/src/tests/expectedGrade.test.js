import { expectedGrades } from "../dependenciesAndRequirements/expectedGrade";

describe('expectedGrades', () => {
  test('returns the correct grade for a given weighted average', () => {
    // Given: A set of weighted averages and their expected grades
    const testCases = [
      { weightedAverage: 1.25, expectedGrade: 1 },
      { weightedAverage: 2.25, expectedGrade: 2 },
      { weightedAverage: 3.25, expectedGrade: 3 },
      { weightedAverage: 4.25, expectedGrade: 4 },
      { weightedAverage: 5.25, expectedGrade: 5 },
      { weightedAverage: 5.75, expectedGrade: 6 },
      { weightedAverage: 6.25, expectedGrade: 'Jesteś poza skalą' },
    ];

    testCases.forEach(({ weightedAverage, expectedGrade }) => {
      // When: expectedGrades is called
      const result = expectedGrades(weightedAverage);

      // Then: The result should be the expected grade
      expect(result).toBe(expectedGrade);
    });
  });
});
