export function CountdownToVacations(toDate){
    const today = new Date();
    const myDate = new Date(toDate);
    const dateDifference = myDate.getTime() - today.getTime();
    const dayDifference = Math.ceil(dateDifference / (1000 * 3600 * 24));

    return dayDifference;
    
}


