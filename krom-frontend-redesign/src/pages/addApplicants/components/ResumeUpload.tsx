import React from 'react';

interface ResumeUploadProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ value, onChange }) => (
    <div className="resume-upload">
        <label>Upload resume url</label>
        <input
            type="text"
            name="resume_link"
            value={value}
            onChange={onChange}
            placeholder="Enter resume url"
        />
    </div>
);

export default ResumeUpload;
