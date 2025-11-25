import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// تحميل متغيرات البيئة
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Error handling middleware (يجب أن يكون بعد Routes)
app.use(errorHandler);

// 404 handler (يجب أن يكون في النهاية)
app.use(notFoundHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}${process.env.API_PREFIX || '/api/v1'}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;

