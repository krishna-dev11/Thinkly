export default function calculateTotalCourseDuration(courseData) {
  let totalSeconds = 0;

  courseData.courseContent.forEach(section => {
    section.subSections.forEach(sub => {
      const duration = parseFloat(sub.timeDuration);
      if (!isNaN(duration)) {
        totalSeconds += duration; // each duration is in seconds
      }
    });
  });

  const hours = Math.floor(totalSeconds / 3600);
  const remainingSecondsAfterHours = totalSeconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const seconds = Math.floor(remainingSecondsAfterHours % 60);

  return `${hours}h ${minutes}min ${seconds}sec`;
}



