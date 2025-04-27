import { Request, Response } from 'express';
import { uploadToGoogleDrive } from '../services/googleAuthService';

// Mengupload foto ke Google Drive
export const uploadPhoto = async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        // Pastikan file tidak undefined sebelum diproses
        const fileUrl = await uploadToGoogleDrive(file);
        res.json({ message: 'File uploaded successfully', fileUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload file' });
    }
};
