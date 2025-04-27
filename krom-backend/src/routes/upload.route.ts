import express from 'express';
import { uploadPhoto } from '../controllers/uploadController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Rute untuk upload foto ke Google Drive
router.post('/photo', upload.single('photo'), uploadPhoto);

export default router;
