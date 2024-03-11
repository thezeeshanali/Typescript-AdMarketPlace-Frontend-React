import React from "react";
import styles from "../styles/PostView.module.css";

interface Comment {
  id: number;
  name: string;
  body: string;
}

interface PostDetailProps {
  title: string;
  body: string;
  comments: Comment[];
}

const PostDetail: React.FC<PostDetailProps> = ({ title, body, comments }) => (
  <div className={styles.postDetail}>
    <div className={styles.postHeader}>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>

    <div className={styles.commentsSection}>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <span className={styles.commentName}>{comment.name}</span>
            <p className={styles.commentBody}>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default PostDetail;
