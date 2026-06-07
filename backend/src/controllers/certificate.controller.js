import { Application } from "../models/Application.js";
import { Certificate } from "../models/Certificate.js";
import { Company } from "../models/Company.js";
import { generateCertificatePdf } from "../services/pdf.service.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listCertificates = asyncHandler(async (_req, res) => {
  const items = await Certificate.find().populate("company client").sort("-createdAt").limit(100);
  res.json({ success: true, items });
});

export const generateCertificate = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.body.applicationId).populate("company client");
  if (!application) throw new ApiError(404, "Application not found");

  const issueDate = new Date();
  const expiryDate = new Date(issueDate);
  expiryDate.setFullYear(issueDate.getFullYear() + 3);

  const certificate = await Certificate.create({
    certificateNumber: `ISO-${issueDate.getFullYear()}-${application.certificationType.replace(/\D/g, "")}-${Date.now().toString().slice(-5)}`,
    application: application._id,
    company: application.company._id,
    client: application.client._id,
    certificationType: application.certificationType,
    issueDate,
    expiryDate,
    issuedBy: req.user._id
  });

  res.status(201).json({ success: true, certificate });
});

export const verifyCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({ certificateNumber: req.params.certificateNumber }).populate("company");
  if (!certificate) throw new ApiError(404, "Certificate not found");
  res.json({
    success: true,
    certificate: {
      companyName: certificate.company.name,
      certificationType: certificate.certificationType,
      issueDate: certificate.issueDate,
      expiryDate: certificate.expiryDate,
      status: certificate.status,
      certificateNumber: certificate.certificateNumber
    }
  });
});

export const downloadCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) throw new ApiError(404, "Certificate not found");
  const company = await Company.findById(certificate.company);
  const pdfBytes = await generateCertificatePdf(certificate, company);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${certificate.certificateNumber}.pdf"`);
  res.send(Buffer.from(pdfBytes));
});
