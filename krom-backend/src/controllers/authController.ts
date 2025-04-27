import { Request, Response } from 'express';
import { getAuthUrl, getToken } from '../services/googleAuthService';

// Mengarahkan pengguna ke halaman autentikasi Google
export const authenticateGoogle = (req: Request, res: Response) => {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);
};

// Callback untuk menangani token setelah autentikasi
export const oauthCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const tokens = await getToken(code);
    res.send('Authentication successful! You can close this window.');
};
