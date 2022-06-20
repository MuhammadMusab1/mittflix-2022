import Provider from "../Provider/Provider";
import styles from "../ProviderList/ProviderList.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProviders } from "../../services/tmdb-api";
import Pagination from "../Pagination/Pagination";
import ProviderShows from "../../pages/ProviderShows";
const ProviderList = ({ watchList, toggle }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  //pagination
  const [providers, setProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [providersPerPage, setProvidersPerPage] = useState(40);
  useEffect(() => {
    getProviders().then((data) => setProviders(data));
  }, []);

  //get current Provider
  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = providers.slice(
    indexOfFirstProvider,
    indexOfLastProvider
  );

  //set page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return id === null ? (
    <div className={styles["titleList"]}>
      <div className={styles["title"]}>
        <h1>Providers</h1>
        <div className={styles["titles-wrapper"]}>
          {currentProviders.map((provider) => {
            return <Provider key={provider.provider_id} provider={provider} />;
          })}
        </div>
        <Pagination
          itemsPerPage={providersPerPage}
          totalItems={providers.length}
          paginate={paginate}
        />
      </div>
    </div>
  ) : (
    <ProviderShows
      providerId={id}
      providers={providers}
      watchList={watchList}
      toggle={toggle}
    />
  );
};
export default ProviderList;
