import imageNotFound from "../../assets/image-not-available.jpg";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Provider/Provider.module.css";
const Provider = (props) => {
  const { provider } = props;
  const { logo_path, provider_name, provider_id } = provider;
  const navigate = useNavigate();
  return (
    <div className={styles["provider"]}>
      <a
        onClick={() => {
          navigate(`/providers?id=${provider_id}`);
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${logo_path}`}
          alt="Movie poster"
        />
        <div className={styles["overlay"]}>
          <div className={styles["title"]}>{provider_name}</div>
        </div>
      </a>
    </div>
  );
};

export default Provider;

/*
display_priority": 0,
      "logo_path": "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
      "provider_name": "Netflix",
      "provider_id": 8
*/
