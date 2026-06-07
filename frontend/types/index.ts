export type Role = "AUDITOR" | "CLIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  companyName: string;
  certificationType: string;
  issueDate: string;
  expiryDate: string;
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED" | "REVOKED";
}
