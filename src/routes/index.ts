import { Router } from 'express';
import { PortalRouter } from './Portal/routes';
import {JobRouter} from './Job/routes';
import {jobDocumentRouter} from './JobDocument/routes';
import {jobSummaryRouter} from './JobSummary/routes';
import { authRouter } from './Auth/routes';

export const routes = Router();

routes.use('/auth', authRouter);
routes.use('/portal', PortalRouter);
routes.use('/job', JobRouter);
routes.use('/job-document', jobDocumentRouter);
routes.use('/job-summary', jobSummaryRouter);

