import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const PaginationForSearch = ({ totalItems, paginate, searchQuery, page }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(page);
  const [query, setQuery] = useState(params.get("query"));
  const navigate = useNavigate();

  const handleNextClick = (e) => {
    setCurrentPage((prevState) => ++prevState);
    setQuery(params.get("query"));
  };
  const handlePreviousClick = (e) => {
    setCurrentPage((prevState) => --prevState);
    setQuery(params.get("query"));
  };

  useEffect(() => {
    paginate(currentPage, query);
    navigate(`/search?query=${query}&page=${currentPage}`);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      setCurrentPage(params.get("page"));
    }
  }, [searchQuery]);

  return (
    <ul className="pagination">
      {page > 1 && (
        <li className="page-item">
          <Link to="#" className="page-link" onClick={handlePreviousClick}>
            Previous
          </Link>
        </li>
      )}
      <li className="page-item">
        <Link to="#" className="page-link">
          {page}
        </Link>
      </li>
      {page < totalItems && (
        <li className="page-item" onClick={handleNextClick}>
          <Link to="#" className="page-link">
            Next
          </Link>
        </li>
      )}
    </ul>
  );
};
export default PaginationForSearch;
