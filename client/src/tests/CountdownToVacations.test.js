import { CountdownToVacations } from "../dependenciesAndRequirements/CountdownToVacations";

describe('CountdownToVacations', () => {
  test('returns the correct number of days until a future date', () => {
    // Given: A future date
    const futureDate = '2024-12-31';

    // When: CountdownToVacations is called
    const result = CountdownToVacations(futureDate);

    // Then: The result should be the number of days until the future date
    // Note: This value will change depending on the current date
    expect(result).toBeGreaterThan(0);
  });

  test('returns a negative number for a past date', () => {
    // Given: A past date
    const pastDate = '2020-01-01';

    // When: CountdownToVacations is called
    const result = CountdownToVacations(pastDate);

    // Then: The result should be a negative number, as the date has already passed
    expect(result).toBeLessThan(0);
});
});
