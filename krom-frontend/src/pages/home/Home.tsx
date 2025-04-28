import { Link } from 'react-router-dom';
import { useHome } from './UseHome';
import ApplicantList from './components/ApplicantList';
import ApplicantDetail from './components/ApplicantsDetail';

export default function Home() {
  const {
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
  } = useHome();

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
                  disabled={currentPage === Math.ceil(filtered.length / 10)}
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
        {selected && (
            <div className="right-panel">
              <div className="detail-header">
                <button className="close-btn" onClick={() => setSelected(null)}>
                  ✕
                </button>
              </div>
              <ApplicantDetail applicant={selected} />
            </div>
        )}
      </div>
  );
}
