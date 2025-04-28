import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from "../../services/api";

export const useAdd = () => {
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

        if (!form.name) {
            validationErrors.name = 'Full Name is required.';
        }

        if (!form.email) {
            validationErrors.email = 'Email is required.';
        } else if (!validateEmail(form.email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }

        if (!form.phone) {
            validationErrors.phone = 'Phone number is required.';
        } else if (!validatePhone(form.phone)) {
            validationErrors.phone = 'Please enter a valid phone number (only digits allowed).';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        await api.post('/applicants', form);
        history.push('/');
    };

    return {
        form,
        errors,
        handleChange,
        handleSubmit,
    };
};
