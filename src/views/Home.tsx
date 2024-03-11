import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { fetchPosts } from "../services/api";
import styles from "../styles/Home.module.css";
import Error from "./Error";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
  const [error, setError] = useState<string | null>(null); // State to hold any error messages
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts(); // Your API call to fetch posts
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("An error occurred:", error);
        setError("Failed to load post details. Please try again later."); // Set a user-friendly error message
      }
    };

    getPosts();
  }, []);

  const handleSelect = (postId: number) => {
    navigate(`/post/${postId}`); // Use navigate with the template string
  };

  if (error) {
    // Render an error message if there's an error
    return <Error />;
  }

  return (
    <div className={styles.container}>
      <Dropdown posts={posts} onSelect={handleSelect} />
    </div>
  );
};

export default Home;
