import { CountdownToVacations } from "../dependenciesAndRequirements/CountdownToVacations";

describe('CountdownToVacations', () => {
  test('returns the correct number of days until a future date', () => {
    const futureDate = '2024-12-31';

    // When
    const result = CountdownToVacations(futureDate);

    // Then
    expect(result).toBeGreaterThan(0);
  });

  test('returns a negative number for a past date', () => {
    // Given
    const pastDate = '2020-01-01';

    // When
    const result = CountdownToVacations(pastDate);

    // Then
    expect(result).toBeLessThan(0);
});
});
