import { db } from '../models/db';
import {RowDataPacket} from "mysql2";

export const getAllApplicants = async (status?: string, role?: string) => {
  let query = 'SELECT * FROM applicants';
  const values: string[] = [];

  // Jika ada kondisi yang diberikan, kita tambahkan WHERE dan kondisi lainnya
  if (status || role) {
    const conditions: string[] = [];

    if (status) {
      conditions.push('status = ?');
      values.push(status);
    }

    if (role) {
      conditions.push('role = ?');
      values.push(role);
    }


    // Gabungkan kondisi dengan 'AND'
    query += ' WHERE ' + conditions.join(' AND ');
  }
  console.log('query:', query);
  console.log('values:', values);

  const [rows] = await db.query(query, values);
  return rows;
};


export const getApplicantById = async (id: string) => {
  const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM applicants WHERE id = ?',
      [id]
  );

  if (!rows || rows.length === 0) {
    return null; // atau throw new Error('Applicant not found');
  }

  return rows[0];
};

export const createApplicant = async (data: any) => {
  const {
    name, email, phone, role, location, resume_link, status, year_of_experience
  } = data;

  const [result] = await db.query(
      `INSERT INTO applicants (name, email, phone, role, location, resume_link, year_of_experience)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, role, location, resume_link, year_of_experience]
  );

  return { id: (result as any).insertId };
};

export const updateApplicant = async (id: string, data: any) => {
  const [result] = await db.query(`UPDATE applicants SET ? WHERE id = ?`, [data, id]);
  return result;
};

export const deleteApplicant = async (id: string) => {
  const [result] = await db.query(`DELETE FROM applicants WHERE id = ?`, [id]);
  return result;
};