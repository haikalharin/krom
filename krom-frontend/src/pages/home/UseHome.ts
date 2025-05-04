import { useEffect, useState } from 'react';
import api from '../../services/api';
import axios from 'axios';
import {Applicant} from "./types";

type Filters = {
    location: string;
    role: string;
    status: string;
};

const itemsPerPage = 10;

export const useHome = () => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [filtered, setFiltered] = useState<Applicant[]>([]);
    const [selected, setSelected] = useState<Applicant | null>(null);
    const [filters, setFilters] = useState<Filters>({ location: '', role: '', status: '' });
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoError, setPhotoError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        api.get('/applicants').then(res => {
            setApplicants(res.data);
            setFiltered(res.data);
        });
    }, []);

    const getUniqueValues = (key: keyof Applicant) => {
        return [...new Set(applicants.map((a) => a[key]).filter(Boolean))];
    };

    const handleFilterChange = (key: keyof Filters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        filterApplicants(newFilters, searchTerm);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        filterApplicants(filters, value);
    };

    const filterApplicants = (filterValues: Filters, search: string) => {
        const result = applicants.filter((a) => {
            const matchLocation = !filterValues.location || a.location?.toLowerCase() === filterValues.location.toLowerCase();
            const matchRole = !filterValues.role || a.role?.toLowerCase() === filterValues.role.toLowerCase();
            const matchStatus = !filterValues.status || a.status?.toLowerCase() === filterValues.status.toLowerCase();
            const matchSearch = !search || a.name?.toLowerCase().includes(search.toLowerCase());

            return matchLocation && matchRole && matchStatus && matchSearch;
        });

        setFiltered(result);
        setCurrentPage(1);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setPhotoError('File must be less than 2MB');
                setPhoto(null);
            } else {
                setPhotoError(null);
                setPhoto(file);
            }
        }
    };

    const handleUploadPhoto = async () => {
        const authToken = localStorage.getItem('googleAuthToken');

        if (!authToken) {
            const response = await axios.get('/auth/');
            window.location.href = response.data.authUrl;
            return;
        }

        if (photo && selected) {
            const formData = new FormData();
            formData.append('photo', photo);

            try {
                const response = await api.put(`/applicants/${selected.id}/upload-photo`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.data && response.data.fileUrl) {
                    setSelected({
                        ...selected,
                        photo_url: response.data.fileUrl,
                    });
                    console.log('Photo uploaded successfully', response.data.fileUrl);
                }
            } catch (error) {
                console.error('Error uploading photo', error);
            }
        }
    };



    const handleNextPage = () => {
        if (currentPage < Math.ceil(filtered.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return {
        applicants,
        filtered,
        selected,
        setSelected,
        filters,
        photo,
        photoError,
        searchTerm,
        currentPage,
        currentItems,
        getUniqueValues,
        handleFilterChange,
        handleSearchChange,
        handlePhotoChange,
        handleUploadPhoto,
        handleNextPage,
        handlePrevPage,
    };
};
