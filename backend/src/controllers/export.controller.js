import { Certificate } from "../models/Certificate.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const columns = [
  ["certificateId", "Certificate ID"],
  ["certificateNumber", "Certificate Number"],
  ["clientName", "Client Name"],
  ["companyName", "Company Name"],
  ["certificateType", "Certificate Type"],
  ["certificationScope", "Scope"],
  ["issueDate", "Issue Date"],
  ["expiryDate", "Expiry Date"],
  ["status", "Status"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["address", "Address"],
  ["certificatePdf", "PDF"]
];

function formatValue(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (value === undefined || value === null) return "";
  return String(value);
}

function csvEscape(value) {
  const text = formatValue(value);
  return `"${text.replace(/"/g, '""')}"`;
}

async function certificateRows() {
  return Certificate.find().sort("-createdAt").lean();
}

export const exportCertificates = asyncHandler(async (_req, res) => {
  const certificates = await certificateRows();
  const header = columns.map(([, label]) => csvEscape(label)).join(",");
  const rows = certificates.map((certificate) => columns.map(([key]) => csvEscape(certificate[key])).join(","));
  const csv = [header, ...rows].join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=certificates.csv");
  res.send(csv);
});

export const exportCertificatesExcel = asyncHandler(async (_req, res) => {
  const certificates = await certificateRows();
  const header = columns.map(([, label]) => `<th>${label}</th>`).join("");
  const rows = certificates.map((certificate) => {
    const cells = columns.map(([key]) => `<td>${formatValue(certificate[key])}</td>`).join("");
    return `<tr>${cells}</tr>`;
  }).join("");

  const html = `<!doctype html><html><head><meta charset="utf-8" /></head><body><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></body></html>`;
  res.setHeader("Content-Type", "application/vnd.ms-excel; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=certificates.xls");
  res.send(html);
});

export const exportClients = exportCertificates;
export const exportRevenue = exportCertificates;
