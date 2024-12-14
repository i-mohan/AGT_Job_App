import React from "react";

const CommentItem = ({ comment, onDelete, onEdit }) => {
  return (
    <tr>
      <td className="py-2 px-4">{comment.name}</td>
      <td className="py-2 px-4">{comment.email}</td>
      <td className="py-2 px-4">{comment.body}</td>
      <td className="py-2 px-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => onEdit(comment)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => onDelete(comment.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CommentItem;
