import { connectDatabase } from "./config/db.js";
import { Application } from "./models/Application.js";
import { Audit } from "./models/Audit.js";
import { Certificate } from "./models/Certificate.js";
import { Company } from "./models/Company.js";
import { Payment } from "./models/Payment.js";
import { Project } from "./models/Project.js";
import { Testimonial } from "./models/Testimonial.js";
import { User } from "./models/User.js";

await connectDatabase();

await Promise.all([
  User.deleteMany({}),
  Company.deleteMany({}),
  Application.deleteMany({}),
  Certificate.deleteMany({}),
  Audit.deleteMany({}),
  Payment.deleteMany({}),
  Project.deleteMany({}),
  Testimonial.deleteMany({})
]);

const auditor = await User.create({ name: "Lead Auditor", email: "auditor@iso.example", password: "Password123!", role: "AUDITOR", phone: "+919876543212" });
const admin = await User.create({ name: "VJ Admin", username: "admin", email: "admin@vjcertifications.example", password: "VJ@123", role: "ADMIN", phone: "+917386181914" });
const client = await User.create({ name: "Priya Nair", email: "client@iso.example", password: "Password123!", role: "CLIENT", phone: "+919876543213" });

const company = await Company.create({
  name: "Aarav Precision Works",
  legalName: "Aarav Precision Works Pvt Ltd",
  industry: "Manufacturing",
  primaryContact: client._id,
  address: { city: "Hyderabad", state: "Telangana", country: "India" }
});

client.company = company._id;
await client.save();

const application = await Application.create({
  company: company._id,
  client: client._id,
  certificationType: "ISO 9001",
  scope: "Quality management system for precision manufacturing",
  sites: 2,
  status: "AUDIT_SCHEDULED",
  assignedAuditor: auditor._id,
  requiredDocuments: [
    { name: "Quality Manual", status: "APPROVED", fileUrl: "local://quality-manual.pdf" },
    { name: "Internal Audit Report", status: "UPLOADED", fileUrl: "local://audit-report.pdf" }
  ]
});

await Certificate.create({
  clientName: client.name,
  companyName: company.name,
  certificateId: "ISO-2026-9001-1842",
  certificateNumber: "ISO-2026-9001-1842",
  certificateType: "ISO 9001",
  certificationScope: "Quality management system for precision manufacturing",
  application: application._id,
  company: company._id,
  client: client._id,
  certificationType: "ISO 9001",
  issueDate: new Date("2026-02-14"),
  expiryDate: new Date("2029-02-13"),
  address: "Hyderabad, Telangana, India",
  issuedBy: admin._id
});

await Audit.create({
  application: application._id,
  company: company._id,
  auditor: auditor._id,
  scheduledAt: new Date("2026-06-08T10:00:00.000Z"),
  type: "STAGE_2",
  status: "SCHEDULED",
  notes: "Review production evidence, corrective actions, and management review records."
});

await Payment.create({ company: company._id, application: application._id, amount: 85000, status: "PAID", paidAt: new Date() });

await Project.create({
  title: "Manufacturing quality transformation",
  slug: "manufacturing-quality-transformation",
  companyName: company.name,
  certificationType: "ISO 9001",
  summary: "Completed end-to-end ISO certification workflow with audit evidence and QR verification."
});

await Testimonial.create({
  name: "Meera Iyer",
  role: "COO",
  company: "Northwind Foods",
  quote: "The platform shortened our certification cycle and gave leadership live status across documents, audits, and renewals."
});

console.log("Seed complete");
console.log("Accounts: admin@vjcertifications.example, auditor@iso.example, client@iso.example");
console.log("Default admin created. Login credentials are set via environment variables.");
console.log("Auditor/client password: set in seed script");
process.exit(0);
