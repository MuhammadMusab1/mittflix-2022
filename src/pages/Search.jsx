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
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState();
  const [currentPage, setCurrentPage] = useState(null);
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      searchShows(query).then((data) => {
        setTitles(data.results);
        setTotalPages(data.pages);
      });
    }
  }, [query]);
  useEffect(() => {
    console.log("page changed");
    searchShowsViaPages(searchQuery, currentPage).then((data) => {
      setTitles(data.results);
      setTotalPages(data.pages);
    });
  }, [currentPage]);
  const paginate = (pageNumber, urlQuery) => {
    setCurrentPage(pageNumber);
    // navigate(`/search?query=${urlQuery}&page=${pageNumber}`); doesn't navigate
  };

  return (
    <>
      {titles ? (
        <>
          <TitleList
            name={`shows matching your search: "${searchQuery}"`}
            titles={titles}
            watchList={watchList}
            toggle={toggle}
          />
          <PaginationForSearch
            paginate={paginate}
            totalItems={totalPages}
            query={searchQuery}
          />
        </>
      ) : (
        <h2>No matching results</h2>
      )}
    </>
  );
};

export default SearchPage;
