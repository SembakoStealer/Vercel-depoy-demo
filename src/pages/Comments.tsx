import React, { useState, useEffect } from "react";
import commentService from "../services/commentService";
import { Comment, CommentFormData } from "../types/comment";

// Helper function to format timestamp as "X hours ago"
const timeAgo = (timestamp: string) => {
  const past = new Date(timestamp);
  const now = new Date();
  const diffHours = Math.floor(
    (now.getTime() - past.getTime()) / (1000 * 60 * 60)
  );
  return diffHours > 0 ? `${diffHours} hours ago` : "Just now";
};

// Main Comment Component
const Comments = () => {
  // State for comments
  const [comments, setComments] = useState<Comment[]>([]);
  
  // State for new comment form
  const [newComment, setNewComment] = useState<CommentFormData>({
    username: "",
    text: ""
  });
  
  // State for editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<CommentFormData>({
    username: "",
    text: ""
  });

  // Load comments on component mount
  useEffect(() => {
    setComments(commentService.getAll());
  }, []);

  // Handle input change for new comment
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewComment({
      ...newComment,
      [name]: value
    });
  };

  // Handle input change for edit form
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  // Create new comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.username.trim() || !newComment.text.trim()) return;
    
    const createdComment = commentService.create(newComment);
    setComments([...comments, createdComment]);
    setNewComment({ username: "", text: "" });
  };

  // Delete comment
  const handleDeleteComment = (id: number) => {
    const deleted = commentService.delete(id);
    if (deleted) {
      setComments(comments.filter(comment => comment.id !== id));
      if (editingId === id) {
        setEditingId(null);
      }
    }
  };

  // Start editing a comment
  const handleStartEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditForm({
      username: comment.username,
      text: comment.text
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // Save edited comment
  const handleSaveEdit = (id: number) => {
    if (!editForm.username.trim() || !editForm.text.trim()) return;
    
    const updatedComment = commentService.update(id, editForm);
    if (updatedComment) {
      setComments(comments.map(comment => 
        comment.id === id ? updatedComment : comment
      ));
    }
    
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Comments
      </h2>

      {/* Add Comment Form */}
      <div className="mt-6 p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-4">Add a Comment</h3>
        <form onSubmit={handleAddComment} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={newComment.username}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <input
              type="text"
              id="text"
              name="text"
              value={newComment.text}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Comment
          </button>
        </form>
      </div>

      {/* Comment List */}
      <div className="mt-6 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-md">
            {editingId === comment.id ? (
              // Edit form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Comment
                  </label>
                  <input
                    type="text"
                    name="text"
                    value={editForm.text}
                    onChange={handleEditChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSaveEdit(comment.id)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Normal display
              <>
                <p className="text-sm text-gray-500">
                  <strong>{comment.username}</strong> • {timeAgo(comment.timestamp)}
                </p>
                <p className="text-gray-900">{comment.text}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleStartEdit(comment)}
                    className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;