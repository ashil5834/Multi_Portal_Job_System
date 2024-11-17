import { Router } from 'express';
import { PortalController } from '../../controllers/PortalController';
import { upload } from '../../middleware/multerConfig';
import { authenticateToken } from '../../middleware/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Portals
 *   description: API endpoints for managing job portals
 */

/**
 * @swagger
 * /portal:
 *   get:
 *     summary: Get all active portals
 *     tags: [Portals]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     responses:
 *       200:
 *         description: List of active portals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       name:
 *                         type: string
 *                         example: "LinkedIn"
 *                       description:
 *                         type: string
 *                         example: "A professional networking site."
 *                       status:
 *                         type: string
 *                         enum: [active, inactive]
 *                         example: "active"
 *                       logoUrl:
 *                         type: string
 *                         example: "/uploads/linkedin-logo.png"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-16T05:20:08.485Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-16T05:20:08.485Z"
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /portal:
 *   post:
 *     summary: Create a new portal
 *     tags: [Portals]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - status
 *               - logo
 *             properties:
 *               name:
 *                 type: string
 *                 example: "LinkedIn"
 *               description:
 *                 type: string
 *                 example: "A professional networking site."
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "active"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: The portal logo (JPG/PNG, max 2MB)
 *     responses:
 *       201:
 *         description: Portal created successfully
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
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     name:
 *                       type: string
 *                       example: "LinkedIn"
 *                     description:
 *                       type: string
 *                       example: "A professional networking site."
 *                     status:
 *                       type: string
 *                       enum: [active, inactive]
 *                       example: "active"
 *                     logoUrl:
 *                       type: string
 *                       example: "/uploads/linkedin-logo.png"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /portal/summary:
 *   get:
 *     summary: Get portal usage summary
 *     tags: [Portals]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     responses:
 *       200:
 *         description: Summary of portal usage
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
 *                     totalPortals:
 *                       type: integer
 *                       example: 5
 *                     activePortals:
 *                       type: integer
 *                       example: 3
 *                     inactivePortals:
 *                       type: integer
 *                       example: 2
 *                     totalDocuments:
 *                       type: integer
 *                       example: 42
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /portal/{id}:
 *   get:
 *     summary: Get details of a specific portal
 *     tags: [Portals]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the portal
 *     responses:
 *       200:
 *         description: Details of the portal
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
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     name:
 *                       type: string
 *                       example: "LinkedIn"
 *                     description:
 *                       type: string
 *                       example: "A professional networking site."
 *                     status:
 *                       type: string
 *                       enum: [active, inactive]
 *                       example: "active"
 *                     logoUrl:
 *                       type: string
 *                       example: "/uploads/linkedin-logo.png"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       404:
 *         description: Portal not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /portal/{id}:
 *   delete:
 *     summary: Delete a specific portal
 *     tags: [Portals]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the portal
 *     responses:
 *       200:
 *         description: Portal deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Portal deleted successfully."
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       404:
 *         description: Portal not found
 *       500:
 *         description: Server error
 */

const portalRouter = Router();
const portalController = new PortalController();

portalRouter.get('/',authenticateToken, portalController.getPortals);
portalRouter.post('/',authenticateToken, upload.single('logo'), portalController.createPortal);
portalRouter.get('/summary',authenticateToken, portalController.getPortalUsageSummary);
portalRouter.get('/:id',authenticateToken, portalController.getPortalById);
portalRouter.delete('/:id',authenticateToken, portalController.deletePortal);

export { portalRouter as PortalRouter };
