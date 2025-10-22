export const formatDateTime = (
  dateTimeInput: string | Date
): { date: string; time: string } => {
  const date =
    dateTimeInput instanceof Date ? dateTimeInput : new Date(dateTimeInput);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export const calculateHours = (
  timeIn: string | Date,
  timeOut: string | Date
): string => {
  const inTime = timeIn instanceof Date ? timeIn : new Date(timeIn);
  const outTime = timeOut instanceof Date ? timeOut : new Date(timeOut);

  const diffMs = outTime.getTime() - inTime.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 0) return "0:00";

  const hours = Math.floor(diffHours);
  const minutes = Math.floor((diffHours - hours) * 60);

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

export const getAttendanceStatus = (
  timeIn: string | Date,
  timeOut: string | Date | null
): string => {
  const inTime = timeIn instanceof Date ? timeIn : new Date(timeIn);
  const workStartTime =
    timeIn instanceof Date ? new Date(timeIn) : new Date(timeIn);
  workStartTime.setHours(8, 0, 0, 0); // Assuming work starts at 8:00 AM

  // Check if employee is late (arrived after 8:00 AM)
  if (inTime > workStartTime) {
    return "Late";
  }

  // Check if employee has time out
  if (!timeOut || timeOut === "null") {
    return "No Time Out";
  }

  return "Present";
};
