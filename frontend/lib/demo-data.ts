import {
  Award,
  BarChart3,
  BellRing,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  ShieldCheck,
  Users
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "ISO Services", href: "/services" },
  { label: "Certifications", href: "/certifications" },
  { label: "Projects", href: "/projects" },
  { label: "Verify Certificate", href: "/verify" },
  { label: "Contact", href: "/contact" }
];

export const counters = [
  { label: "Certified Companies", value: "1,240+" },
  { label: "Audit Completion", value: "98.7%" },
  { label: "Countries Served", value: "22" },
  { label: "Certificates Issued", value: "1,500+" }
];

export const certificationTypes = [
  "ISO 9001:2015 Quality Management System",
  "ISO 14001:2015 Environment Management System",
  "ISO 13485:2016 Medical Devices",
  "ISO 20000:2011 IT Service Management",
  "ISO 22000:2018 Food Safety Management",
  "ISO 50001:2018 Energy Management",
  "ISO 27001:2013 Information Security",
  "ISO 45001:2018 Occupational Health & Safety",
  "ISO 37001:2016 Anti-Bribery Management",
  "GHP Good Hygiene Practices",
  "AS 9100(D) Aerospace Certification"
];

export const processSteps = [
  {
    title: "Apply Online",
    description: "Company profile, ISO scope, sites, contacts, and document checklist are captured in one guided workflow.",
    icon: Building2
  },
  {
    title: "Document Review",
    description: "Auditors review policy files, SOPs, evidence, and corrective actions with complete audit history.",
    icon: ClipboardCheck
  },
  {
    title: "Audit & Approval",
    description: "Audits are scheduled, monitored, scored, and summarized with AI-assisted findings and compliance actions.",
    icon: CalendarCheck
  },
  {
    title: "Certificate Issued",
    description: "Certificates are generated with unique IDs, QR verification, expiry tracking, renewals, and public lookup.",
    icon: Award
  }
];

export const achievements = [
  { label: "Accredited audit partners", value: "120", icon: ShieldCheck },
  { label: "Enterprise clients managed", value: "740", icon: Users },
  { label: "Automated notifications sent", value: "58k", icon: BellRing },
  { label: "Verified public certificates", value: "31k", icon: Globe2 }
];

export const applications = [
  { company: "Aarav Precision Works", type: "ISO 9001", status: "Under Review", date: "2026-05-18", owner: "Priya Nair" },
  { company: "Northwind Foods Pvt Ltd", type: "ISO 22000", status: "Approved", date: "2026-05-12", owner: "Rahul Mehta" },
  { company: "BluePeak Infosec", type: "ISO 27001", status: "Audit Scheduled", date: "2026-05-09", owner: "Sara Khan" },
  { company: "GreenGrid Manufacturing", type: "ISO 14001", status: "Changes Requested", date: "2026-05-01", owner: "Dev Patel" }
];

export const certificates = [
  {
    number: "ISO-2026-9001-1842",
    company: "Aarav Precision Works",
    type: "ISO 9001",
    issueDate: "2026-02-14",
    expiryDate: "2029-02-13",
    status: "Active"
  },
  {
    number: "ISO-2025-27001-1130",
    company: "BluePeak Infosec",
    type: "ISO 27001",
    issueDate: "2025-11-05",
    expiryDate: "2028-11-04",
    status: "Active"
  },
  {
    number: "ISO-2024-14001-0871",
    company: "GreenGrid Manufacturing",
    type: "ISO 14001",
    issueDate: "2024-06-20",
    expiryDate: "2027-06-19",
    status: "Active"
  }
];

export const analytics = [
  { month: "Jan", applications: 38, certificates: 24, revenue: 420000 },
  { month: "Feb", applications: 44, certificates: 31, revenue: 510000 },
  { month: "Mar", applications: 52, certificates: 39, revenue: 640000 },
  { month: "Apr", applications: 47, certificates: 35, revenue: 590000 },
  { month: "May", applications: 61, certificates: 46, revenue: 780000 },
  { month: "Jun", applications: 69, certificates: 51, revenue: 840000 }
];

export const statusData = [
  { name: "Active", value: 68, fill: "#10b981" },
  { name: "Pending", value: 19, fill: "#f59e0b" },
  { name: "Expired", value: 8, fill: "#ef4444" },
  { name: "Renewal", value: 5, fill: "#0ea5e9" }
];

export const auditData = [
  { week: "W1", completed: 12, pending: 4 },
  { week: "W2", completed: 18, pending: 6 },
  { week: "W3", completed: 21, pending: 5 },
  { week: "W4", completed: 26, pending: 7 }
];

export const dashboardStats = [
  { label: "Total Certifications", value: "8,912", change: "+12.4%", icon: FileCheck2 },
  { label: "Monthly Revenue", value: "₹8.4L", change: "+18.2%", icon: BarChart3 },
  { label: "Open Applications", value: "186", change: "+9.1%", icon: ClipboardCheck },
  { label: "Upcoming Audits", value: "42", change: "This week", icon: CalendarCheck }
];

export const testimonials = [
  {
    quote: "The platform shortened our certification cycle and gave our leadership a live view of every document, audit, and renewal.",
    name: "Meera Iyer",
    role: "COO, Northwind Foods"
  },
  {
    quote: "Public QR verification and WhatsApp reminders made certificate management feel far more trustworthy for our customers.",
    name: "Arjun Reddy",
    role: "Director, Aarav Precision"
  },
  {
    quote: "Auditors finally have one system for schedules, evidence, AI summaries, non-conformities, and certificate history.",
    name: "Nisha Thomas",
    role: "Lead Auditor"
  }
];
