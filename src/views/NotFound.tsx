import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404: Page Not Found</h1>
      <p className={styles.text}>The page you requested could not be found.</p>
      <Link to="/" className={styles.link}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
