import { Router } from 'express';
import { JobController } from '../../controllers/JobController';
import { authenticateToken } from '../../middleware/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API endpoints for managing jobs
 */

/**
 * @swagger
 * /job:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     responses:
 *       200:
 *         description: List of jobs
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
 *                       title:
 *                         type: string
 *                         example: "Software Engineer"
 *                       description:
 *                         type: string
 *                         example: "Develop and maintain web applications."
 *                       status:
 *                         type: string
 *                         enum: [draft, published, closed]
 *                         example: "published"
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
 */

/**
 * @swagger
 * /job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Frontend Developer"
 *               description:
 *                 type: string
 *                 example: "Build modern web applications."
 *               status:
 *                 type: string
 *                 enum: [draft, published, closed]
 *                 example: "draft"
 *     responses:
 *       201:
 *         description: Job created successfully
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
 *                     title:
 *                       type: string
 *                       example: "Frontend Developer"
 *                     description:
 *                       type: string
 *                       example: "Build modern web applications."
 *                     status:
 *                       type: string
 *                       enum: [draft, published, closed]
 *                       example: "draft"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       500:
 *         description: Error creating job
 */

/**
 * @swagger
 * /job/{id}:
 *   put:
 *     summary: Update a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Job Title"
 *               description:
 *                 type: string
 *                 example: "Updated job description."
 *               status:
 *                 type: string
 *                 enum: [draft, published, closed]
 *                 example: "published"
 *     responses:
 *       200:
 *         description: Job updated successfully
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
 *                     title:
 *                       type: string
 *                       example: "Updated Job Title"
 *                     description:
 *                       type: string
 *                       example: "Updated job description."
 *                     status:
 *                       type: string
 *                       enum: [draft, published, closed]
 *                       example: "published"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       404:
 *         description: Job not found
 *       500:
 *         description: Error updating job
 */

/**
 * @swagger
 * /job/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully
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
 *                   example: "Job deleted successfully."
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       404:
 *         description: Job not found
 *       500:
 *         description: Error deleting job
 */

const jobRouter = Router();
const jobController = new JobController();

jobRouter.get('/',authenticateToken,  jobController.getJobs); 
jobRouter.post('/',authenticateToken,  jobController.createJob);
jobRouter.put('/:id',authenticateToken,  jobController.updateJob);
jobRouter.delete('/:id',authenticateToken,  jobController.deleteJob);

export { jobRouter as JobRouter };
