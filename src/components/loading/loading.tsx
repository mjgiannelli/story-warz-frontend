import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './loading.module.scss';

const LoadingComponent = () => {
  return (
    <div className={styles.loading}>
      <FontAwesomeIcon icon={faSpinner} className={styles.loadingSvg}/>
    </div>
  );
};

export default LoadingComponent;