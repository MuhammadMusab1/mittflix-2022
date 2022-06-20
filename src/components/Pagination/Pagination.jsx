import { Link } from "react-router-dom";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumber.map((number) => {
        return (
          <li key={number} className="page-item">
            <Link to="#" onClick={() => paginate(number)} className="page-link">
              {number}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default Pagination;
