export interface LeaveRequest {
  id?: string;
  employeeId: string;
  employeeName: string;
  subsidiary: string;
  designation: string;
  department: string;
  leaveType: "SL" | "VL";
  dateRequested: Date;
  dateFrom: Date;
  dateTo: Date;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: Date;
}

export interface LeaveRequestForm {
  requestType: "SL" | "VL";
  startDate: string;
  endDate: string;
  reason: string;
  token?: string;
  employeeId?: string;
  type: string;
  subsidiary: string | undefined;
  requestorID: string | undefined;
  department: string | undefined;
  designation: string | undefined;
}
