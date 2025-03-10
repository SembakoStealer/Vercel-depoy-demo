import React, { useState, useEffect } from "react";
import { Post } from "../types/post";

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Omit<Post, "id" | "createdAt"> | Partial<Post>) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  post,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (post && isEditing) {
      setTitle(post.title);
      // Access content and author safely, assuming they might not exist on Post type
      if ("content" in post) {
        setContent(post.content as string);
      }
      if ("author" in post) {
        setAuthor(post.author as string);
      }
    }
  }, [post, isEditing]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!author.trim()) newErrors.author = "Author name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (isEditing && post) {
      onSubmit({
        id: post.id,
        title,
        description: content,
        author: author,
      });
    } else {
      onSubmit({
        title,
        description: content,
        author,
      });
    }

    // Reset form
    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? "Edit Post" : "Create New Post"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.author ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-500">{errors.author}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isEditing ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
