import { Link, useNavigate } from "react-router-dom";
const PaginationForSearch = ({ totalItems, paginate, query }) => {
  const pageNumber = [];
  const navigate = useNavigate();
  for (let i = 1; i <= totalItems; i++) {
    pageNumber.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumber.map((number) => {
        return (
          <li key={number} className="page-item">
            <Link
              to="#"
              onClick={() => paginate(number, query)}
              className="page-link"
            >
              {number}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default PaginationForSearch;
