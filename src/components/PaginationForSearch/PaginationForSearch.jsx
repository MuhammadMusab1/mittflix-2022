import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const PaginationForSearch = ({ totalItems, paginate }) => {
  const totalPages = [];
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const [query, setQuery] = useState(params.get("query"));
  const navigate = useNavigate();
  for (let i = 1; i <= totalItems; i++) {
    totalPages.push(i);
  }
  const handleNextClick = (e) => {
    setCurrentPage((prevState) => ++prevState);
    console.log(currentPage);
  };
  const handlePreviousClick = (e) => {
    setCurrentPage((prevState) => --prevState);
  };

  useEffect(() => {
    paginate(currentPage, query);
    navigate(`/search?query=${query}&page=${currentPage}`);
  }, [currentPage]);

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <li className="page-item">
          <Link to="#" className="page-link" onClick={handlePreviousClick}>
            Previous
          </Link>
        </li>
      )}
      <li className="page-item">
        <Link to="#" className="page-link">
          {currentPage}
        </Link>
      </li>
      {currentPage < totalItems && (
        <li className="page-item" onClick={handleNextClick}>
          <Link to="#" className="page-link">
            Next
          </Link>
        </li>
      )}
      {/* {totalPages.map((number) => {
        return (
          <li
            key={number}
            className="page-item"
            onClick={() => {
              paginate(number, query);
              navigate(`/search?query=${query}&page=${number}`);
            }}
          >
            <Link to="#" className="page-link">
              {number}
            </Link>
          </li>
        );
      })} */}
    </ul>
  );
};
export default PaginationForSearch;
