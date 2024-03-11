// Fetch posts
export const fetchPosts = async () => {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
    res.json()
  );
};

// Fetch comments for a post
export const fetchComments = async (postId: number) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((res) => res.json());
};

// Post a comment
export const postComment = async (commentData: CommentData) => {
  return fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());
};

interface Post {
  id: number;
  title: string;
  body: string;
}

interface CommentData {
  postId: number;
  body: string;
}
