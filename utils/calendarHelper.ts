export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const generateMonthMatrix = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const matrix: (number | null)[][] = [];
  let week: (number | null)[] = [];

  // Add blank days for the first week
  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }

  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }

  // Add remaining days and fill with blanks if necessary
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    matrix.push(week);
  }

  return matrix;
}; 