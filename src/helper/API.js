import axios from "axios";

const API_BASE = "https://jsonplaceholder.typicode.com/comments";

// Fetch comments with pagination (page and limit)
export const getComments = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(API_BASE, {
      params: {
        _page: page,
        _limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments", error);
  }
};

// Create a new comment
export const createComment = async (newComment) => {
  try {
    const response = await axios.post(API_BASE, newComment);
    return response.data;
  } catch (error) {
    console.error("Error creating comment", error);
  }
};

// Update a comment
export const updateComment = async (id, updatedComment) => {
  try {
    const response = await axios.put(`${API_BASE}/${id}`, updatedComment);
    return response.data;
  } catch (error) {
    console.error("Error updating comment", error);
  }
};

// Delete a comment
export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment", error);
  }
};
