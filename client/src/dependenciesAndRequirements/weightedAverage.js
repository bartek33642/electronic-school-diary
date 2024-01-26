/**
 * @param {Array} grades 
 * @param {number} weight 
 * @returns {number} 
 */
export const calculateWeightedAverage = (grades, weights) => {
    if (grades.length === 0 || grades.length !== weights.length) {
      return 0;
    }
  
    const weightedSum = grades.reduce((sum, grade, index) => sum + grade * weights[index], 0);
    const sumWeights = weights.reduce((sum, weight) => sum + weight, 0);
  
    const average = weightedSum / sumWeights;
  
    return average;
  };


