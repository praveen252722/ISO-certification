import mongoose from "mongoose";
import { env } from "../config/env.js";
import { connectMongoDB } from "../lib/mongodb.js";
import { Certificate, createCertificateId } from "../models/Certificate.js";

function missingCertificateIdFilter() {
  return {
    $or: [
      { certificateId: { $exists: false } },
      { certificateId: null },
      { certificateId: "" }
    ]
  };
}

function normalizeCandidate(value) {
  const text = String(value ?? "").trim().toUpperCase();
  return text.length >= 3 ? text : createCertificateId();
}

async function uniqueCertificateId(candidate, currentId) {
  let value = normalizeCandidate(candidate);

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const existing = await Certificate.exists({
      _id: { $ne: currentId },
      certificateId: value
    });

    if (!existing) return value;
    value = createCertificateId();
  }

  throw new Error(`Unable to generate a unique certificate ID for document ${currentId}`);
}

async function main() {
  await connectMongoDB(env.mongoUri);

  const beforeCount = await Certificate.countDocuments(missingCertificateIdFilter());
  console.log(`Certificates missing certificateId before migration: ${beforeCount}`);

  const certificates = await Certificate.find(missingCertificateIdFilter()).sort({ createdAt: 1 });
  let updated = 0;

  for (const certificate of certificates) {
    const certificateId = await uniqueCertificateId(certificate.certificateNumber, certificate._id);
    certificate.certificateId = certificateId;
    if (!certificate.certificateNumber) certificate.certificateNumber = certificateId;
    await certificate.save();
    updated += 1;
    console.log(`Updated ${certificate._id}: ${certificateId}`);
  }

  const afterCount = await Certificate.countDocuments(missingCertificateIdFilter());
  const indexes = await Certificate.collection.indexes();

  console.log(`Updated certificates: ${updated}`);
  console.log(`Certificates missing certificateId after migration: ${afterCount}`);
  console.log("Certificate indexes:");
  indexes.forEach((index) => console.log(JSON.stringify(index)));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
