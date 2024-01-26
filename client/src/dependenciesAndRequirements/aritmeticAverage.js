/**
 * @param {Array} grades 
 * @returns {number} 
 */
export const calculateAritmeticAverage = (grades) => {
    if (grades.length === 0) {
      return 0; 
    }
  
    const sum = grades.reduce((accumulator, grade) => accumulator + grade, 0);
  
    const average = sum / grades.length.toFixed(2);
  
    return average;
  }
  