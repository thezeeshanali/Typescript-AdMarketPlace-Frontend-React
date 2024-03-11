import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../components/PostDetails";
import { fetchPosts, fetchComments, postComment } from "../services/api";
import Error from "./Error";
import styles from "../styles/PostView.module.css";

const PostView: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<{
    id: number;
    title: string;
    body: string;
  } | null>(null);
  const [comments, setComments] = useState<
    { id: number; name: string; body: string }[]
  >([]);
  const [newCommentText, setNewCommentText] = useState(""); // New state for handling input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null); // State to hold any error messages

  const fetchData = useCallback(async () => {
    try {
      const fetchedPosts = await fetchPosts();
      // Ensure postId is treated as a string and not undefined
      const selectedPost = fetchedPosts.find(
        (p: { id: number }) => p.id === parseInt(postId || "0")
      );
      if (selectedPost) {
        setPost(selectedPost);
        // Same treatment for postId here
        const fetchedComments = await fetchComments(parseInt(postId || "0"));
        setComments(fetchedComments);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Failed to load post details. Please try again later."); // Set a user-friendly error message
    }
  }, [postId]); // Dependencies for useCallback

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   const getPostDetails = async () => {
  //     if (post) {
  //       console.log("post does exist now");
  //     } else {
  //       try {
  //         const fetchedPosts = await fetchPosts();
  //         // Ensure postId is treated as a string and not undefined
  //         const selectedPost = fetchedPosts.find(
  //           (p: { id: number }) => p.id === parseInt(postId || "0")
  //         );
  //         if (selectedPost) {
  //           setPost(selectedPost);
  //           // Same treatment for postId here
  //           const fetchedComments = await fetchComments(
  //             parseInt(postId || "0")
  //           );
  //           setComments(fetchedComments);
  //         }
  //       } catch (error) {
  //         console.error("An error occurred:", error);
  //         setError("Failed to load post details. Please try again later."); // Set a user-friendly error message
  //       }
  //     }
  //   };

  //   getPostDetails();
  // }, []);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      // Alert if name or email is empty
      alert("Please enter both name and email");
      return;
    }

    if (!newCommentText.trim()) {
      // Still prevent submitting empty comments
      return;
    }

    const commentToPost = {
      postId: parseInt(postId || "0"),
      body: newCommentText,
      name: name, // Include name from state
      email: email, // Include email from state
    };

    const postedComment = await postComment(commentToPost); // Implement this function
    setComments([...comments, postedComment]);
    setNewCommentText(""); // Clear comment text after posting
    setName(""); // Clear name after posting
    setEmail(""); // Clear email after posting
  };

  if (error) {
    // Render an error message if there's an error
    return <Error postId={postId} />;
  }

  return post ? (
    <>
      <div className={styles.postContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.body}</p>

          <div className={styles.uiSection}>
            {comments.map((comment) => (
              <div className={styles.comment}>
                <div className={styles.postAnimation}>
                  <div className={styles.commenterName}>{comment.name}</div>
                  <div className={styles.commentMessage}>{comment.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.commentsContainer}>
          <h2 className={styles.title}>Add a Comment</h2>
          <form onSubmit={handleCommentSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.inputData}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {/* <div className={styles.underline}></div> */}
              </div>
              <div className={styles.inputData}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* <div className={styles.underline}></div> */}
              </div>
            </div>
            <div className={styles.inputDataTextarea}>
              <textarea
                placeholder="Write your comment..."
                rows={10}
                cols={80}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                required
              ></textarea>
              {/* <div className={styles.underline}></div> */}
            </div>
            <div className={styles.submitBtn}>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <Error postId={postId} />
  );
};

export default PostView;
