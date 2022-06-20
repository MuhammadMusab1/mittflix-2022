import imageNotFound from "../../assets/image-not-available.jpg";
import { Link } from "react-router-dom";
import styles from "../Provider/Provider.module.css";
const Provider = (props) => {
  return (
    <div className={styles["provider"]}>
      <Link to={``}>
        <img src={imageNotFound} alt="Movie poster" />
        <div className={styles["overlay"]}>
          <div className={styles["title"]}>Netflix</div>
        </div>
      </Link>
    </div>
  );
};

export default Provider;
