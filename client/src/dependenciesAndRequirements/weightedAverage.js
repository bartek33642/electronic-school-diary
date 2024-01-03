// /**
//  * Funkcja do obliczania średniej arytmetycznej ocen.
//  * @param {Array} grades - Tablica ocen.
//  * @param {number} weight - Waga ocen.
//  * @returns {number} - Średnia arytmetyczna ocen.
//  */
// export const calculateWeightedAverage = (grades, weights) => {
//     if (grades.length === 0 || grades.length !== weights.length) {
//       return 0;
//     }
  
//     const weightedSum = grades.reduce((sum, grade, index) => sum + grade * weights[index], 0);
//     const sumWeights = weights.reduce((sum, weight) => sum + weight, 0);
  
//     const average = weightedSum / sumWeights;
  
//     return average;
//   };

/**
 * Funkcja do obliczania średniej ważonej ocen.
 * @param {Array} grades - Tablica ocen.
 * @returns {number} - Średnia ważona ocen.
 */
export const calculateWeightedAverage = (grades) => {
  if (grades.length === 0) {
    return 0;
  }

  const weightedSum = grades.reduce((sum, { grade, weight }) => sum + grade * weight, 0);
  const sumWeights = grades.reduce((sum, { weight }) => sum + weight, 0);

  const average = weightedSum / sumWeights;

  return average;
};
