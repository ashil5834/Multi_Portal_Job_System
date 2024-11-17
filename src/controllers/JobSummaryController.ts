import { Request, Response, RequestHandler } from 'express';
import { Job } from '../models/Job';
import { Op } from 'sequelize';
import moment from 'moment';

export class JobSummaryController {
  // Get analytic report based on year/month/week
  public getJobSummary: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { timeframe } = req.params;

      let startDate: Date;
      let endDate: Date = new Date();

      switch (timeframe) {
        case 'year':
          startDate = moment().startOf('year').toDate();
          break;
        case 'month':
          startDate = moment().startOf('month').toDate();
          break;
        case 'week':
          startDate = moment().startOf('week').toDate();
          break;
        default:
          res.status(400).json({
            success: false,
            message: 'Invalid timeframe. Please use "year", "month", or "week".',
          });
          return;
      }

      const jobCount = await Job.count({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        success: true,
        data: {
          timeframe,
          jobCount,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching job summary.',
      });
    }
  };
}
