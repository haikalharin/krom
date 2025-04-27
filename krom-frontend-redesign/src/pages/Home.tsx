import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './styles.css';
import axios from "axios";

type Applicant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  status: string;
  year_of_experience: number;
  resume_link: string;
  photo_url?: string;
};

const Home = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filtered, setFiltered] = useState<Applicant[]>([]);
  const [selected, setSelected] = useState<Applicant | null>(null);
  const [filters, setFilters] = useState({ location: '', role: '', status: '' });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    api.get('/applicants').then(res => {
      setApplicants(res.data);
      setFiltered(res.data);
    });
  }, []);

  const getUniqueValues = (key: string) => {
    return [...new Set(applicants.map((a: any) => a[key]).filter(Boolean))];
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    filterApplicants(newFilters, searchTerm);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    filterApplicants(filters, value);
  };

  const filterApplicants = (filterValues: any, search: string) => {
    const result = applicants.filter((a: any) => {
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

  // Hitung data yang ditampilkan di halaman ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
      <div className="container">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="header">
            <h2>Applicants</h2>
            <Link to="/add">
              <button className="add-btn">+ Add Application</button>
            </Link>
          </div>

          {/* Filters */}
          <div className="filters">
            <select onChange={e => handleFilterChange('location', e.target.value)} value={filters.location}>
              <option value="">Location</option>
              {getUniqueValues('location').map((loc: string) => (
                  <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <select onChange={e => handleFilterChange('role', e.target.value)} value={filters.role}>
              <option value="">Job Role</option>
              {getUniqueValues('role').map((role: string) => (
                  <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select onChange={e => handleFilterChange('status', e.target.value)} value={filters.status}>
              <option value="">Status</option>
              {getUniqueValues('status').map((status: string) => (
                  <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Search and Pagination Container */}
          <div className="search-pagination-container">
            {/* Search by Name */}
            <div className="search-container">
              <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>&lt;</button>
              <span className="page-number">{currentPage}</span>
              <button onClick={handleNextPage}
                      disabled={currentPage === Math.ceil(filtered.length / itemsPerPage)}>&gt;</button>
            </div>
          </div>


          {/* Table */}
          <table className="applicants-table">
            <thead>
            <tr>
              <th>candidate_name</th>
              <th>candidate_email</th>
              <th>applied_role</th>
              <th>application_status</th>
            </tr>
            </thead>
            <tbody>
            {currentItems.map((a: any) => (
                <tr
                    key={a.id}
                    onClick={() => setSelected(a)}
                    className={selected?.id === a.id ? 'selected-row' : ''}
                >
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.role}</td>
                  <td>{a.status}</td>
                </tr>
            ))}
            </tbody>
          </table>


        </div>

        {/* Right Panel (Detail) */}
        {selected && (
            <div className="right-panel">
              <div className="photo-container">
                <img
                    src={selected.photo_url || 'https://sman93jkt.sch.id/wp-content/uploads/2018/01/765-default-avatar.png'}
                    alt="Candidate"
                    className="candidate-photo"
                />
              </div>

              <div className="detail-item"><b>Name:</b> {selected.name}</div>
              <div className="detail-item"><b>Email:</b> <a href={`mailto:${selected.email}`}>{selected.email}</a></div>
              <div className="detail-item"><b>Phone No:</b> {selected.phone}</div>
              <div className="detail-item"><b>Years of Experience:</b> {selected.year_of_experience}</div>
              <div className="detail-item"><b>Role Applied For:</b> {selected.role}</div>
              <div className="detail-item"><b>Location:</b> {selected.location}</div>
              <div className="detail-item"><b>Resume:</b> <a href={selected.resume_link} target="_blank" rel="noreferrer">Resume</a></div>
              <div className="detail-item">
                <b>Status:</b> <span className={`status ${selected.status.toLowerCase()}`}>{selected.status}</span>
              </div>

              <div className="buttons">
                <button className="btn-green">Schedule Interview</button>
                <button className="btn-outline">Review</button>
              </div>
            </div>
        )}
      </div>
  );
};

export default Home;
