import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

export async function generateCertificatePdf(certificate, company) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const qrDataUrl = await QRCode.toDataURL(certificate.certificateNumber);
  const qrImage = await pdfDoc.embedPng(qrDataUrl);

  page.drawRectangle({ x: 24, y: 24, width: 794, height: 547, borderColor: rgb(0.05, 0.45, 0.65), borderWidth: 3 });
  page.drawText("ISO CERTIFICATE OF REGISTRATION", { x: 160, y: 480, size: 28, font, color: rgb(0.04, 0.19, 0.35) });
  page.drawText(company.name, { x: 300, y: 405, size: 24, font, color: rgb(0.02, 0.35, 0.31) });
  page.drawText(`has been certified for ${certificate.certificationType}`, { x: 245, y: 365, size: 16, font: regular });
  page.drawText(`Certificate No: ${certificate.certificateNumber}`, { x: 90, y: 120, size: 12, font: regular });
  page.drawText(`Valid until: ${new Date(certificate.expiryDate).toDateString()}`, { x: 90, y: 96, size: 12, font: regular });
  page.drawImage(qrImage, { x: 680, y: 80, width: 90, height: 90 });

  return pdfDoc.save();
}
