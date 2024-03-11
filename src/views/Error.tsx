import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Error.module.css";

interface ErrorProps {
  postId?: string;
}
const Error: React.FC<ErrorProps> = ({ postId }) => {
  return (
    <div className={styles.error}>
      <h1>Error</h1>
      <p>An error occurred while fetching data.</p>
      <p>Invalid postId: {postId}</p>
      <Link to="/" className={styles.link}>
        Go to Home
      </Link>
    </div>
  );
};

export default Error;
