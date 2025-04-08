export const convertMinutesToHoursAndMinutes = (totalMinutes) => {
    const total = parseFloat(totalMinutes); // Ensure it's a float
    const hours = Math.floor(total / 60);
    const minutes = Math.round(total % 60);
  
    if (hours === 0) {
      return `${minutes}min`;
    } else if (minutes === 0) {
      return `${hours}h `;
    } else {
      return `${hours}h ${minutes}min `;
    }
  };
  