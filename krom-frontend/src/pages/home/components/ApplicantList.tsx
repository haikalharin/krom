import React from 'react';
import {Applicant} from "../types";

interface ApplicantListProps {
    applicants: Applicant[];
    selectedId: string | null;
    onSelect: (applicant: Applicant) => void;
}

const ApplicantList: React.FC<ApplicantListProps> = ({ applicants, selectedId, onSelect }) => {
    return (
        <table className="applicants-table">
            <thead>
            <tr>
                <th>Candidate Name</th>
                <th>Candidate Email</th>
                <th>Applied Role</th>
                <th>Application Status</th>
            </tr>
            </thead>
            <tbody>
            {applicants.map((a) => (
                <tr
                    key={a.id}
                    onClick={() => onSelect(a)}
                    className={selectedId === a.id ? 'selected-row' : ''}
                >
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.role}</td>
                    <td>
              <span className={`status ${a.status.toLowerCase()}`}>
                {a.status}
              </span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ApplicantList;
