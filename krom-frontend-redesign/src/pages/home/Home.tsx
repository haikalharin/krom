import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import {Applicant} from "./types";
import api from "../../services/api";
import ApplicantDetail from "./components/ApplicantsDetail";
import ApplicantList from "./components/ApplicantList";

const Home = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filtered, setFiltered] = useState<Applicant[]>([]);
  const [selected, setSelected] = useState<Applicant | null>(null);
  const [filters, setFilters] = useState({ location: '', role: '', status: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    api.get('/applicants').then(res => {
      setApplicants(res.data);
      setFiltered(res.data);
    });
  }, []);

  const getUniqueValues = (key: keyof Applicant) => {
    return [...new Set(applicants.map(a => a[key]).filter(Boolean))];
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

  const filterApplicants = (filterValues: typeof filters, search: string) => {
    const result = applicants.filter((a) => {
      const matchLocation = !filterValues.location || a.location.toLowerCase() === filterValues.location.toLowerCase();
      const matchRole = !filterValues.role || a.role.toLowerCase() === filterValues.role.toLowerCase();
      const matchStatus = !filterValues.status || a.status.toLowerCase() === filterValues.status.toLowerCase();
      const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase());

      return matchLocation && matchRole && matchStatus && matchSearch;
    });

    setFiltered(result);
    setCurrentPage(1);
  };

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
              {getUniqueValues('location').map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <select onChange={e => handleFilterChange('role', e.target.value)} value={filters.role}>
              <option value="">Job Role</option>
              {getUniqueValues('role').map((role) => (
                  <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select onChange={e => handleFilterChange('status', e.target.value)} value={filters.status}>
              <option value="">Status</option>
              {getUniqueValues('status').map((status) => (
                  <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Search and Pagination */}
          <div className="search-pagination-container">
            <div className="search-container">
              <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>&lt;</button>
              <span className="page-number">{currentPage}</span>
              <button
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(filtered.length / itemsPerPage)}
              >&gt;</button>
            </div>
          </div>

          {/* Table List */}
          <ApplicantList
              applicants={currentItems}
              selectedId={selected?.id || null}
              onSelect={setSelected}
          />
        </div>

        {/* Right Panel */}
        {selected && <ApplicantDetail applicant={selected} />}
      </div>
  );
};

export default Home;
