import React from 'react';

interface SelectInputProps {
    label: string;
    name: string;
    options: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, options, value, onChange }) => (
    <div className="form-group">
        <label>{label}</label>
        <select name={name} value={value} onChange={onChange} className="form-control">
            <option value="">Select option</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

export default SelectInput;
