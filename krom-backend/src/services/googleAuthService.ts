import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const REDIRECT_URI = 'http://localhost:5175';

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Mendapatkan URL autentikasi Google
export const getAuthUrl = (): string => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/drive.file'],
    });
    return authUrl;
};

// Mendapatkan token akses setelah autentikasi
export const getToken = async (code: string): Promise<any> => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};

// Mengupload file ke Google Drive
export const uploadToGoogleDrive = async (file: Express.Multer.File) => {
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const fileMetadata = {
        name: file.originalname, // Nama file yang diupload
        parents: ['root'], // Menyimpan di folder root Google Drive
    };

    const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path), // Membaca file dari server
    };

    try {
        // Perbaiki pemanggilan dengan menyesuaikan dengan tipe yang tepat
        const response = await drive.files.create({
            requestBody: fileMetadata,  // Perhatikan perubahan nama key menjadi 'requestBody'
            media: media,
            fields: 'id',  // Memastikan kita hanya meminta ID
        });

        // Memastikan response berisi data yang valid
        if (!response.data || !response.data.id) {
            throw new Error('File ID is missing in the response');
        }

        const fileId = response.data.id;
        const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;

        // Menghapus file sementara di server setelah upload
        fs.unlinkSync(file.path);

        return fileUrl;
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error);
        throw new Error('Failed to upload file to Google Drive');
    }
};
