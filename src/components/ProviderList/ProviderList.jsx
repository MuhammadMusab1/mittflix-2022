import Provider from "../Provider/Provider";
import styles from "../ProviderList/ProviderList.module.css";
const ProviderList = (props) => {
  return (
    <div className={styles["titleList"]}>
      <div className={styles["title"]}>
        <h1>Providers</h1>
        <div className={styles["titles-wrapper"]}>
          <Provider />
          <Provider />
          <Provider />
          <Provider />
          <Provider />
        </div>
      </div>
    </div>
  );
};
export default ProviderList;
