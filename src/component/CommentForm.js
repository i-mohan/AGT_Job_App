import React, { useState, useEffect } from "react";

const CommentForm = ({ onSubmit, existingData }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existingData) {
      setId(existingData.id);
      setName(existingData.name);
      setEmail(existingData.email);
      setBody(existingData.body);
    }
  }, [existingData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if the fields are empty
    if (!name || !email || !body) {
      setError("All fields are required!");
      return;
    }

    // If there's no error, clear the error and submit the form data
    setError("");
    const newComment = { id, name, email, body };
    if (existingData) {
      onSubmit({ ...newComment, id: existingData.id });
    } else {
      onSubmit(newComment);
    }

    // Clear the form
    setName("");
    setEmail("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>
      )}

      <input
        type="text"
        className="border p-2 rounded w-full mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="border p-2 rounded w-full mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        className="border p-2 rounded w-full mb-4"
        placeholder="Comment"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={!name || !email || !body} // Disable submit button if any field is empty
      >
        {existingData ? "Update Comment" : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
