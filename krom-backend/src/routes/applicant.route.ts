import { Router } from 'express';
import * as controller from '../controllers/applicant.controller';
import { upload } from '../services/multer.service'; // pastikan Anda mengimpor middleware upload
import {getApplicantsPagination, uploadPhoto} from '../controllers/applicant.controller'; // pastikan Anda mengimpor fungsi uploadPhoto

const router = Router();

// Rute untuk mendapatkan semua applicant
router.get('/', controller.getApplicants);

// GET /applicants?status=pending&role=admin&page=2&limit=5
router.get('/pagination', controller.getApplicantsPagination);

// Rute untuk mendapatkan applicant berdasarkan ID
router.get('/:id', controller.getApplicant);

// Rute untuk membuat applicant baru
router.post('/', controller.createApplicant);

// Rute untuk memperbarui data applicant berdasarkan ID
router.put('/:id', controller.updateApplicant);

// Rute untuk menghapus applicant berdasarkan ID
router.delete('/:id', controller.deleteApplicant);

// Rute untuk mengupload foto dan memperbarui URL foto di database
router.put('/:id/upload-photo', upload.single('photo'), uploadPhoto);

export default router;
