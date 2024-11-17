import { Request, Response, RequestHandler } from 'express';
import { Portal } from '../models/Portal';
import { JobDocument } from '../models/JobDocument';

export class PortalController {
  // Get all portals
    public getPortals: RequestHandler = async (req: Request, res: Response) => {
        try {
          const baseUrl = `${req.protocol}://${req.get('host')}`;
    
          const portals = await Portal.findAll({
            attributes: ['id', 'name', 'description', 'status', 'logoUrl', 'createdAt', 'updatedAt'],
            where: { status: 'active' },
          });
    
          const portalsWithFullUrl = portals.map((portal) => {
            const portalData = portal.toJSON();
            return {
              ...portalData,
              logoUrl: portalData.logoUrl ? `${baseUrl}/${portalData.logoUrl}` : null,
            };
          });
    
          res.status(200).json({
            success: true,
            data: portalsWithFullUrl,
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: 'Error fetching portals',
          });
        }
      };

  // Create a portal.
  public createPortal: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { name, description, status } = req.body;

      const logoUrl = req.file?.path;

      const newPortal = await Portal.create({
        name,
        description,
        status,
        logoUrl,
      });

      res.status(201).json({
        success: true,
        data: newPortal,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating portal',
      });
    }
  };

  // Get portal by Id.
  public getPortalById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const portal = await Portal.findByPk(id, {
        attributes: ['id', 'name', 'description', 'status', 'logoUrl', 'createdAt', 'updatedAt'],
      });

      if (!portal) {
        res.status(404).json({
          success: false,
          message: 'Portal not found',
        });
        return;
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const portalWithFullUrl = {
        ...portal.toJSON(),
        logoUrl: portal.logoUrl ? `${baseUrl}/${portal.logoUrl}` : null,
      };

      res.status(200).json({
        success: true,
        data: portalWithFullUrl,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching portal',
      });
    }
  };

  // Delete a portal.
  public deletePortal: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const portal = await Portal.findByPk(id);

      if (!portal) {
        res.status(404).json({
          success: false,
          message: 'Portal not found',
        });
        return;
      }

      await portal.destroy();

      res.status(200).json({
        success: true,
        message: 'Portal deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting portal',
      });
    }
  };

  // Get portal usage summary.
  public getPortalUsageSummary: RequestHandler = async (req: Request, res: Response) => {
    try {
      const totalPortals = await Portal.count();
      const activePortals = await Portal.count({ where: { status: 'active' } });
      const inactivePortals = totalPortals - activePortals;
      const totalDocuments = await JobDocument.count();

      res.status(200).json({
        success: true,
        data: {
          totalPortals,
          activePortals,
          inactivePortals,
          totalDocuments,
        },
      });
    } catch (error) {
      console.error('Error fetching portal usage summary:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching portal usage summary',
      });
    }
  };

}
