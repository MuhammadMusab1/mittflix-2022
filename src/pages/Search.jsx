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
      if (page) {
        paginate(page, query);
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
            name={`shows matching your search: "${query}"`}
            titles={titles}
            watchList={watchList}
            toggle={toggle}
          />
          <PaginationForSearch
            paginate={paginate}
            totalItems={totalPages}
            searchQuery={query}
            page={page}
          />
        </>
      ) : (
        <h2>No matching results</h2>
      )}
    </>
  );
};

export default SearchPage;
