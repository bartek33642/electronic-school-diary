/**
 * Funkcja do obliczania średniej arytmetycznej ocen.
 * @param {Array} grades - Tablica ocen.
 * @returns {number} - Średnia arytmetyczna ocen.
 */
export const calculateAritmeticAverage = (grades) => {
    // Sprawdź, czy tablica ocen nie jest pusta
    if (grades.length === 0) {
      return 0; // Zwróć 0, jeśli brak ocen
    }
  
    // Sumuj wszystkie oceny w tablicy
    const sum = grades.reduce((accumulator, grade) => accumulator + grade, 0);
  
    // Oblicz średnią arytmetyczną
    const average = sum / grades.length.toFixed(2);
  
    return average;
  }
  
//   // Przykład użycia funkcji
//   const exampleGrades = [4, 5, 4];
//   const averageResult = calculateAritmeticAverage(exampleGrades);
//   console.log(`Średnia arytmetyczna: ${averageResult}`);
  