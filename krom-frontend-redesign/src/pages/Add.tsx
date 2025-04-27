import React, { useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

const Add = () => {
    const [form, setForm] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const history = useHistory();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^[0-9]+$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async () => {
        let validationErrors: any = {};

        // Validasi nama (wajib diisi)
        if (!form.name) {
            validationErrors.name = 'Full Name is required.';
        }

        // Validasi email (wajib diisi dan valid)
        if (!form.email) {
            validationErrors.email = 'Email is required.';
        } else if (!validateEmail(form.email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }

        // Validasi nomor telepon (wajib diisi dan hanya angka)
        if (!form.phone) {
            validationErrors.phone = 'Phone number is required.';
        } else if (!validatePhone(form.phone)) {
            validationErrors.phone = 'Please enter a valid phone number (only digits allowed).';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Kirim data jika tidak ada error
        await api.post('/applicants', form);
        history.push('/');
    };

    return (
        <div className="add-container">
            <h2 className="add-header">Applicant Tracker</h2>

            <div className="add-form">
                <h3 className="add-title">Upload a new candidate application</h3>

                <div className="add-form-grid">
                    {/* Full Name */}
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder="Enter first & last name"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    {/* Phone No */}
                    <div className="form-group">
                        <label>Phone No.</label>
                        <input
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            placeholder="Enter phone number including country prefix"
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>

                    {/* Email address */}
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter email address"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    {/* Role */}
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select option</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Fullstack Developer">Fullstack Developer</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                        </select>
                    </div>

                    {/* Years of experience */}
                    <div className="form-group">
                        <label>Years of experience</label>
                        <input
                            type="number"
                            name="year_of_experience"
                            onChange={handleChange}
                            placeholder="e.g 5"
                        />
                    </div>

                    {/* Location */}
                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            onChange={handleChange}
                            placeholder="Enter the country"
                        />
                    </div>
                </div>

                {/* Resume URL */}
                <div className="resume-upload">
                    <label>Upload resume url</label>
                    <input
                        type="text"
                        name="resume_link"
                        onChange={handleChange}
                        placeholder="Enter resume url"
                    />
                </div>

                {/* Submit Button */}
                <div className="submit-button-wrapper">
                    <button
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Add;
