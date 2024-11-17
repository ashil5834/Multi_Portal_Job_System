import { Request, Response, RequestHandler } from 'express';
import { Job } from '../models/Job';
import { Portal } from '../models/Portal';
import { JobDocument } from '../models/JobDocument';

export class JobDocumentController {
  // Upload job document to a specific portal.
  public uploadDocument: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id, portalId } = req.params;

      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'No file uploaded. Please provide a valid document.',
        });
        return;
      }

      const job = await Job.findByPk(id);
      if (!job) {
        res.status(404).json({
          success: false,
          message: 'Job not found.',
        });
        return;
      }

      const portal = await Portal.findByPk(portalId);
      if (!portal) {
        res.status(404).json({
          success: false,
          message: 'Portal not found.',
        });
        return;
      }

      const newDocument = await JobDocument.create({
        jobId: id,
        portalId,
        documentUrl: req.file.path,
        documentType: req.file.mimetype.split('/')[1],
      });

      res.status(201).json({
        success: true,
        data: newDocument,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error uploading document.',
      });
    }
  };
}
