import express, { Express } from 'express';
import { routes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { setupSwagger } from './config/swagger';

const app: Express = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

        
        

