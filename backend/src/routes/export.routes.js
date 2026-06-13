import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import * as exportCtrl from "../controllers/export.controller.js";

export const exportRoutes = Router();

exportRoutes.use(authenticate, authorize("ADMIN"));

exportRoutes.get("/certificates", exportCtrl.exportCertificates);
exportRoutes.get("/certificates.csv", exportCtrl.exportCertificates);
exportRoutes.get("/certificates.xlsx", exportCtrl.exportCertificatesExcel);
exportRoutes.get("/certificates.xls", exportCtrl.exportCertificatesExcel);
