import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchShows, searchShowsViaPages } from "../services/tmdb-api";
import TitleList from "../components/TitleList";
import PaginationForSearch from "../components/PaginationForSearch/PaginationForSearch";

const SearchPage = ({ watchList, toggle }) => {
  const [titles, setTitles] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  const page = params.get("page");
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (query) {
      searchShows(query).then((data) => {
        setTitles(data.results);
        setTotalPages(data.pages);
      });
      if (Number.isInteger(+page) && +page > 0) {
        paginate(page, query);
      } else {
        navigate(`/search?query=${query}&page=1`);
      }
    }
  }, [query]);
  const paginate = (pageNumber, urlQuery) => {
    searchShowsViaPages(urlQuery, pageNumber).then((data) => {
      setTitles(data.results);
      setTotalPages(data.pages);
    });
  };
  return (
    <>
      {titles ? (
        <>
          <TitleList
            name={
              +page === totalPages
                ? "End of Results"
                : `shows matching your search: "${query}"`
            }
            titles={titles}
            watchList={watchList}
            toggle={toggle}
          />
          {titles.length === 0 && (
            <h2>{`No results found for page: ${page}!!`}</h2>
          )}
          {titles.length >= 20 && (
            <PaginationForSearch
              paginate={paginate}
              totalItems={totalPages}
              searchQuery={query}
              page={page}
            />
          )}
        </>
      ) : (
        <h2>No matching results</h2>
      )}
    </>
  );
};

export default SearchPage;
