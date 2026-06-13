export type Role = "SUPER_ADMIN" | "ADMIN" | "AUDITOR" | "CLIENT";

export type ApplicationStatus = "draft" | "submitted" | "under_review" | "approved" | "rejected" | "certified";
export type CertificateStatus = "active" | "expired" | "revoked";
export type AuditStatus = "scheduled" | "in_progress" | "completed" | "failed";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  phone?: string;
  company?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  _id: string;
  userId: string | User;
  companyName: string;
  registrationNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  website?: string;
  industry?: string;
  employeeCount?: number;
  logo?: string;
  documents?: { name: string; url: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  userId: string | User;
  companyId?: string | Company;
  certificationType: string;
  status: ApplicationStatus;
  documents?: { name: string; url: string; uploadedAt: string }[];
  notes?: string;
  assignedTo?: string | User;
  stage?: string;
  submittedAt?: string;
  reviewedAt?: string;
  certifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  _id: string;
  applicationId?: string | Application;
  userId?: string | User;
  companyName: string;
  certificationType: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  status: CertificateStatus;
  qrCode?: string;
  pdfUrl?: string;
  issuedBy?: string | User;
  createdAt: string;
}

export interface Audit {
  _id: string;
  applicationId: string | Application;
  userId: string | User;
  auditorId: string | User;
  type: "initial" | "surveillance" | "recertification";
  status: AuditStatus;
  scheduledDate?: string;
  completedDate?: string;
  findings?: string;
  score?: number;
  report?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  _id: string;
  title: string;
  type: "audit" | "financial" | "client" | "certificate";
  generatedBy: string | User;
  data?: any;
  format?: string;
  url?: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  userId: string | User;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface Payment {
  _id: string;
  userId: string | User;
  applicationId?: string | Application;
  amount: number;
  currency?: string;
  status: PaymentStatus;
  method?: string;
  transactionId?: string;
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  clientName?: string;
  category?: string;
  image?: string;
  completionDate?: string;
  featured?: boolean;
  status: "ongoing" | "completed";
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  company?: string;
  designation?: string;
  content: string;
  rating?: number;
  image?: string;
  featured?: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: Role;
  phone?: string;
  company?: string;
}

export interface DashboardStats {
  totalCertifications: number;
  monthlyRevenue: number;
  openApplications: number;
  upcomingAudits: number;
  activeCertificates: number;
  expiredCertificates: number;
  totalClients: number;
  totalAuditors: number;
}
