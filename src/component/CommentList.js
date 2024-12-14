// CommentList.js
import React from "react";

const CommentList = ({ comments, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg text-gray-800">
            {comment.name}
          </h3>
          <p className="text-gray-600 text-sm">{comment.email}</p>
          <p className="mt-2 text-gray-700 text-base">{comment.body}</p>

          {/* Edit and Delete Buttons */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => onEdit(comment)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
