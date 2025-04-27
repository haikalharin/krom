import React, { useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import FormInput from "./components/FormInput";
import SelectInput from "./components/SelectInputs";
import ResumeUpload from "./components/ResumeUpload";
import SubmitButton from "./components/SubmitButton";

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
                    <FormInput
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="Enter first & last name"
                        value={form.name || ''}
                        onChange={handleChange}
                        error={errors.name}
                    />

                    {/* Phone No */}
                    <FormInput
                        label="Phone No."
                        name="phone"
                        type="text"
                        placeholder="Enter phone number including country prefix"
                        value={form.phone || ''}
                        onChange={handleChange}
                        error={errors.phone}
                    />

                    {/* Email address */}
                    <FormInput
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={form.email || ''}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    {/* Role */}
                    <SelectInput
                        label="Role"
                        name="role"
                        options={['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'DevOps Engineer']}
                        value={form.role || ''}
                        onChange={handleChange}
                    />

                    {/* Years of experience */}
                    <FormInput
                        label="Years of experience"
                        name="year_of_experience"
                        type="number"
                        placeholder="e.g 5"
                        value={form.year_of_experience || ''}
                        onChange={handleChange}
                    />

                    {/* Location */}
                    <FormInput
                        label="Location"
                        name="location"
                        type="text"
                        placeholder="Enter the country"
                        value={form.location || ''}
                        onChange={handleChange}
                    />
                </div>

                {/* Resume URL */}
                <ResumeUpload
                    value={form.resume_link || ''}
                    onChange={handleChange}
                />

                {/* Submit Button */}
                <SubmitButton onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Add;
