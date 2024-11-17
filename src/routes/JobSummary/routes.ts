import { Router } from 'express';
import { JobSummaryController } from '../../controllers/JobSummaryController';
import { authenticateToken } from '../../middleware/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Job Summaries
 *   description: API endpoints for job advertisement summaries and analytics
 */

/**
 * @swagger
 * /job-summary/jobad-summary/{timeframe}:
 *   get:
 *     summary: Get job advertisement summary by timeframe
 *     tags: [Job Summaries]
 *     security:
 *       - bearerAuth: []  # JWT authentication
 *     parameters:
 *       - in: path
 *         name: timeframe
 *         required: true
 *         schema:
 *           type: string
 *           enum: [year, month, week]
 *         description: The timeframe for the summary (year, month, or week)
 *     responses:
 *       200:
 *         description: Job summary retrieved successfully
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
 *                     timeframe:
 *                       type: string
 *                       example: "month"
 *                     jobCount:
 *                       type: integer
 *                       example: 42
 *       400:
 *         description: Invalid timeframe
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
 *                   example: "Invalid timeframe. Please use 'year', 'month', or 'week'."
 *       401:
 *         description: Unauthorized (invalid or missing JWT token)
 *       500:
 *         description: Server error
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
 *                   example: "Error fetching job summary."
 */

const jobSummaryRouter = Router();
const jobSummaryController = new JobSummaryController();

jobSummaryRouter.get('/jobad-summary/:timeframe',authenticateToken, jobSummaryController.getJobSummary);

export { jobSummaryRouter };
