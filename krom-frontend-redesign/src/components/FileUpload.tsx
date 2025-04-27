import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    // Handle image change and validation
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setImageError('File must be less than 2MB');
                setImage(null); // Clear the file input if error
            } else {
                setImageError(null);
                setImage(file);
            }
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (image) {
            const formData = new FormData();
            formData.append('photo', image);

            try {
                const response = await axios.post('http://localhost:3001/upload-photo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setFileUrl(response.data.fileUrl);
                console.log('File uploaded to Google Drive:', response.data.fileUrl);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div>
            <h1>Upload Foto ke Google Drive</h1>
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            {imageError && <div style={{ color: 'red' }}>{imageError}</div>}
            <button onClick={handleUpload} disabled={!image}>Upload</button>

            {fileUrl && (
                <div>
                    <p>File uploaded successfully!</p>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
