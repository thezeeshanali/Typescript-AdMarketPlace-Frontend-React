import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PostView from "../views/PostView";
import * as api from "../services/api";

jest.mock("../services/api");

const mockPostId = "1";
const mockPost = {
  id: 1,
  title: "Test Post",
  body: "This is a test post",
};
const mockComments = [
  {
    id: 1,
    name: "Commenter",
    body: "This is a test comment",
  },
];

describe("PostView Component", () => {
  test("successfully fetches and displays post and comments", async () => {
    (api.fetchPosts as jest.Mock).mockResolvedValueOnce(mockPost);
    (api.fetchComments as jest.Mock).mockResolvedValueOnce(mockComments);

    const { getByText } = render(
      <MemoryRouter initialEntries={[`/post/${mockPostId}`]}>
        <Routes>
          <Route path="/post/:postId">
            <PostView />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Test Post")).toBeInTheDocument();
      expect(getByText("This is a test post")).toBeInTheDocument();
      expect(getByText("Commenter")).toBeInTheDocument();
      expect(getByText("This is a test comment")).toBeInTheDocument();
    });
  });
});
