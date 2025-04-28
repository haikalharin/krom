import React from 'react';
import { useAdd } from './useAdd';
import FormInput from './components/FormInput';
import SelectInput from './components/SelectInputs';
import ResumeUpload from './components/ResumeUpload';
import SubmitButton from './components/SubmitButton';

const Add = () => {
    const { form, errors, handleChange, handleSubmit } = useAdd();

    return (
        <div className="add-container">
            <h2 className="add-header">Applicant Tracker</h2>

            <div className="add-form">
                <h3 className="add-title">Upload a new candidate application</h3>

                <div className="add-form-grid">
                    <FormInput
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="Enter first & last name"
                        value={form.name || ''}
                        onChange={handleChange}
                        error={errors.name}
                    />

                    <FormInput
                        label="Phone No."
                        name="phone"
                        type="text"
                        placeholder="Enter phone number including country prefix"
                        value={form.phone || ''}
                        onChange={handleChange}
                        error={errors.phone}
                    />

                    <FormInput
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={form.email || ''}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <SelectInput
                        label="Role"
                        name="role"
                        options={['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'DevOps Engineer']}
                        value={form.role || ''}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Years of experience"
                        name="year_of_experience"
                        type="number"
                        placeholder="e.g 5"
                        value={form.year_of_experience || ''}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Location"
                        name="location"
                        type="text"
                        placeholder="Enter the country"
                        value={form.location || ''}
                        onChange={handleChange}
                    />
                </div>

                <ResumeUpload
                    value={form.resume_link || ''}
                    onChange={handleChange}
                />

                <SubmitButton onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Add;
