import { Request, Response } from 'express';
import * as applicantService from '../services/applicant.service';
import {uploadToGoogleDrive} from "../services/googleAuthService";

export const getApplicants = async (req: Request, res: Response) => {
  const { status, role } = req.query;
  const applicants = await applicantService.getAllApplicants(status as string, role as string);
  res.json(applicants);
};

export const getApplicantsPagination = async (req: Request, res: Response) => {
  const { status, role, page = '1', limit = '10' } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const offset = (pageNumber - 1) * limitNumber;

  const { data, total } = await applicantService.getAllApplicantsPagination(
      status as string,
      role as string,
      offset,
      limitNumber
  );

  res.json({
    currentPage: pageNumber,
    totalPages: Math.ceil(total / limitNumber),
    totalItems: total,
    items: data,
  });
};

export const getApplicant = async (req: Request, res: Response) => {
  const applicant = await applicantService.getApplicantById(req.params.id);
  if (!applicant) return res.status(404).json({ message: 'Not found' });
  res.json(applicant);
};

export const createApplicant = async (req: Request, res: Response) => {
  const newApplicant = await applicantService.createApplicant(req.body);
  res.status(201).json(newApplicant);
};

export const updateApplicant = async (req: Request, res: Response) => {
  await applicantService.updateApplicant(req.params.id, req.body);
  res.json({ message: 'Updated' });
};

export const deleteApplicant = async (req: Request, res: Response) => {
  await applicantService.deleteApplicant(req.params.id);
  res.json({ message: 'Deleted' });
};

export const uploadPhoto = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const fileUrl = await uploadToGoogleDrive(file);
    await applicantService.updateApplicant(req.params.id, { photo_url: fileUrl }); // Update foto di DB
    res.json({ fileUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};