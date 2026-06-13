import { matchedData } from "express-validator";
import { AuditLog } from "../models/AuditLog.js";
import { Certificate } from "../models/Certificate.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function publicCertificate(certificate) {
  const item = certificate.toObject ? certificate.toObject() : certificate;

  return {
    id: item._id,
    clientName: item.clientName,
    companyName: item.companyName ?? item.company?.name,
    certificateNumber: item.certificateNumber,
    certificateType: item.certificateType ?? item.certificationType,
    certificationScope: item.certificationScope,
    issueDate: item.issueDate,
    expiryDate: item.expiryDate,
    status: item.status,
    email: item.email,
    phone: item.phone,
    address: item.address
  };
}

function certificateLookup(value) {
  if (/^[a-f\d]{24}$/i.test(value)) return { _id: value };
  return { certificateNumber: value };
}

async function writeAuditLog(req, action, certificate, metadata = {}) {
  await AuditLog.create({
    actor: req.user?._id,
    action,
    entity: "Certificate",
    entityId: certificate._id,
    metadata,
    ipAddress: req.ip,
    userAgent: req.get("user-agent")
  });
}

export const listCertificates = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page ?? 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit ?? 20), 1), 100);
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.status = String(req.query.status).toUpperCase();
  if (req.query.certificateType) filter.certificationType = new RegExp(String(req.query.certificateType), "i");
  if (req.query.search) {
    const search = String(req.query.search).trim();
    filter.$or = [
      { clientName: new RegExp(search, "i") },
      { companyName: new RegExp(search, "i") },
      { certificateNumber: new RegExp(search, "i") }
    ];
  }

  const [items, total] = await Promise.all([
    Certificate.find(filter).sort("-createdAt").skip(skip).limit(limit),
    Certificate.countDocuments(filter)
  ]);

  res.json({ success: true, page, limit, total, items });
});

export const createCertificate = asyncHandler(async (req, res) => {
  const data = matchedData(req, { locations: ["body"] });
  const certificate = await Certificate.create(data);
  await writeAuditLog(req, "CERTIFICATE_CREATED", certificate, { certificateNumber: certificate.certificateNumber });
  res.status(201).json({ success: true, certificate });
});

export const updateCertificate = asyncHandler(async (req, res) => {
  const data = matchedData(req, { locations: ["body"] });
  const certificate = await Certificate.findOneAndUpdate(certificateLookup(req.params.id), data, { new: true, runValidators: true });

  if (!certificate) throw new ApiError(404, "Certificate not found");
  await writeAuditLog(req, "CERTIFICATE_UPDATED", certificate, { certificateNumber: certificate.certificateNumber });
  res.json({ success: true, certificate });
});

export const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOneAndDelete(certificateLookup(req.params.id));

  if (!certificate) throw new ApiError(404, "Certificate not found");
  await writeAuditLog(req, "CERTIFICATE_DELETED", certificate, { certificateNumber: certificate.certificateNumber });
  res.json({ success: true, message: "Certificate deleted successfully" });
});

export const searchByClientName = asyncHandler(async (req, res) => {
  const clientName = req.query.clientName ?? req.params.clientName;
  if (!clientName || String(clientName).trim().length < 2) {
    throw new ApiError(422, "Client name must be at least 2 characters");
  }

  const certificates = await Certificate.find({ clientName: new RegExp(String(clientName).trim(), "i") }).sort("-createdAt").limit(50);
  res.json({ success: true, items: certificates.map(publicCertificate) });
});

export const verifyCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findOne({
    certificateNumber: req.params.certificateNumber
  }).populate("company");

  if (!certificate) throw new ApiError(404, "Certificate not found");
  res.json({ success: true, certificate: publicCertificate(certificate) });
});
