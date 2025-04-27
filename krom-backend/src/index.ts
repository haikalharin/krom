import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import applicantRoutes from './routes/applicant.route';
import authRoutes from './routes/auth.route';
import uploadRoutes from './routes/upload.route';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Menggunakan routing untuk applicants, auth, dan upload
app.use('/applicants', applicantRoutes);
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);

// Menjalankan server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
