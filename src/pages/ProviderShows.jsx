import { useEffect, useState } from "react";
import TitleList from "../components/TitleList";
import { useLocation } from "react-router-dom";
import { getShowsByProviderId } from "../services/tmdb-api";
const ProviderShows = ({ providerId, providers, watchList, toggle }) => {
  const [shows, setShows] = useState([]);
  useEffect(() => {
    getShowsByProviderId(providerId).then((shows) => setShows(shows));
  }, []);
  const provider = providers.find(
    (provider) => provider.provider_id === +providerId
  );
  return (
    <>
      <TitleList
        name={provider ? provider.provider_name : provider}
        providerId={providerId}
        titles={shows}
        watchList={watchList}
        toggle={toggle}
      />
      {shows.length === 0 && (
        <h2>
          No shows found for {provider ? provider.provider_name : providerId}
        </h2>
      )}
    </>
  );
};

export default ProviderShows;
