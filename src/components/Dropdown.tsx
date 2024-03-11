import React from "react";
import styles from "../styles/Dropdown.module.css";

interface DropdownProps {
  posts: { id: number; title: string }[];
  onSelect: (postId: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ posts, onSelect }) => (
  <select
    className={styles.dropdown}
    onChange={(e) => onSelect(Number(e.target.value))}
    defaultValue=""
  >
    <option value="" disabled>
      Select a post
    </option>
    {posts.map((post) => (
      <option key={post.id} value={post.id}>
        {post.title}
      </option>
    ))}
  </select>
);

export default Dropdown;
