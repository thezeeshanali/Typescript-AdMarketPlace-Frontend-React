import React from "react";
import { render, waitFor } from "@testing-library/react";
import Home from "../views/Home";
import { fetchPosts } from "../services/api";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/api");

describe("Home Component", () => {
  test("fetches posts from API and sets state", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];
    (fetchPosts as jest.Mock).mockResolvedValue(mockPosts);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchPosts).toHaveBeenCalledTimes(1);
    });
  });
});
