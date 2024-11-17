import { Router } from 'express';
import { JobDocumentController } from '../../controllers/JobDocumentController';
import { upload } from '../../middleware/multerConfig';
import { authenticateToken } from '../../middleware/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Job Documents
 *   description: API endpoints for managing job-related documents
 */

/**
 * @swagger
 * /job-document/{id}/documents/{portalId}:
 *   post:
 *     summary: Upload a document for a specific job and portal
 *     tags: [Job Documents]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job for which the document is being uploaded
 *       - in: path
 *         name: portalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the portal to associate the document with
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload (PDF, DOC, DOCX, max 5MB)
 *     responses:
 *       201:
 *         description: Document uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     jobId:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     portalId:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174002"
 *                     documentUrl:
 *                       type: string
 *                       example: "uploads/job-description.pdf"
 *                     documentType:
 *                       type: string
 *                       enum: [pdf, doc, docx]
 *                       example: "pdf"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-16T06:00:00.485Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-16T06:00:00.485Z"
 *       400:
 *         description: Bad request (e.g., no file uploaded or invalid file format)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No file uploaded. Please provide a valid document."
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       404:
 *         description: Job or portal not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Job not found."
 *       500:
 *         description: Server error
 */

const jobDocumentRouter = Router();
const jobDocumentController = new JobDocumentController();

jobDocumentRouter.post('/:id/documents/:portalId',authenticateToken, upload.single('document'), jobDocumentController.uploadDocument);

export { jobDocumentRouter };
