import React, { useState, useEffect } from "react";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "./helper/API";
import CommentList from "./component/CommentList";
import CommentForm from "./component/CommentForm";
import axios from "axios";

const App = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalComments, setTotalComments] = useState(0); // Track total comments count
  const commentsPerPage = 10; // Number of comments per page

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(currentPage, commentsPerPage);
      setComments(data);

      // Fetch the total number of comments to calculate total pages
      const totalResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setTotalComments(totalResponse.data.length);
    };
    fetchComments();
  }, [currentPage]);

  // Filter comments based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = comments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredComments(filtered);
    } else {
      setFilteredComments(comments);
    }
  }, [searchQuery, comments]);

  const handleAddComment = async (newComment) => {
    const createdComment = await createComment(newComment);
    setComments([...comments, createdComment]);
  };

  const handleEditComment = async (updatedComment) => {
    const updatedData = await updateComment(updatedComment.id, updatedComment);
    setComments(
      comments.map((comment) =>
        comment.id === updatedData.id ? updatedData : comment
      )
    );
    setEditingComment(null);
  };

  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);

    // Adjust pagination if the current page is empty after deletion
    if (updatedComments.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination logic
  const handleNextPage = () => {
    if (currentPage * commentsPerPage < totalComments) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-3xl">
        Comments Dashboard
      </h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full sm:w-1/2 lg:w-1/3 mx-auto"
          placeholder="Search comments by name, email, or text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <CommentForm
        onSubmit={editingComment ? handleEditComment : handleAddComment}
        existingData={editingComment}
      />

      {/* Display Filtered Comments */}
      <CommentList
        comments={filteredComments}
        onDelete={handleDeleteComment}
        onEdit={setEditingComment}
      />

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleNextPage}
          disabled={currentPage * commentsPerPage >= totalComments}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
