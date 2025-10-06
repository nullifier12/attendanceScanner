export interface AttendanceRecord {
  ID: number;
  emp_id: string;
  time_in: string | Date;
  att_out: string | Date | null;
}

export interface FormattedAttendanceRecord {
  ID: number;
  emp_id: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: string;
  hours: string;
}
