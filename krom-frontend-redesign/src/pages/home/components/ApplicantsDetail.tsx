import React from 'react';
import {Applicant} from "../types";

interface ApplicantDetailProps {
    applicant: Applicant;
}

const ApplicantDetail: React.FC<ApplicantDetailProps> = ({ applicant }) => {
    return (
        <div className="right-panel">
            <div className="photo-container">
                <img
                    src={applicant.photo_url || 'https://sman93jkt.sch.id/wp-content/uploads/2018/01/765-default-avatar.png'}
                    alt="Candidate"
                    className="candidate-photo"
                />
            </div>

            <div className="detail-item"><b>Name:</b> {applicant.name}</div>
            <div className="detail-item"><b>Email:</b> <a href={`mailto:${applicant.email}`}>{applicant.email}</a></div>
            <div className="detail-item"><b>Phone No:</b> {applicant.phone}</div>
            <div className="detail-item"><b>Years of Experience:</b> {applicant.year_of_experience}</div>
            <div className="detail-item"><b>Role Applied For:</b> {applicant.role}</div>
            <div className="detail-item"><b>Location:</b> {applicant.location}</div>
            <div className="detail-item"><b>Resume:</b> <a href={applicant.resume_link} target="_blank" rel="noreferrer">Resume</a></div>
            <div className="detail-item">
                <b>Status:</b> <span className={`status ${applicant.status.toLowerCase()}`}>{applicant.status}</span>
            </div>

            <div className="buttons">
                <button className="btn-green">Schedule Interview</button>
                <button className="btn-outline">Review</button>
            </div>
        </div>
    );
};

export default ApplicantDetail;
