import cors from 'cors';
import dotenv from 'dotenv';
import applicantRoutes from './routes/applicant.route';
import authRoutes from './routes/auth.route';
import uploadRoutes from './routes/upload.route';
import sequelize from './configDb/database';
import express from "express";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Menggunakan routing untuk applicants, auth, dan upload
app.use('/applicants', applicantRoutes);
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);

async function startServer() {
    try {
        // Authenticate Sequelize connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Menjalankan server
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Call the startServer function to start the app and DB connection
startServer();
