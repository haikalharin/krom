import express from 'express';
import { authenticateGoogle, oauthCallback } from '../controllers/authController';

const router = express.Router();

// Rute untuk mengarahkan pengguna ke halaman autentikasi Google
router.get('/', authenticateGoogle);

// Rute untuk menangani callback setelah autentikasi
router.get('/callback', oauthCallback);

export default router;
