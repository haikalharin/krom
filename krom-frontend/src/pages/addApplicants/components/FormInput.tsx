import React from 'react';

interface FormInputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 label,
                                                 name,
                                                 type,
                                                 placeholder,
                                                 value,
                                                 onChange,
                                                 error
                                             }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
        {error && <span className="error">{error}</span>} {/* Error message will be red */}
    </div>
);

export default FormInput;
