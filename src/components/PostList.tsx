import React, { useEffect, useState } from "react";
import { Post } from "../types/post";
import { postService } from "../services/postService";

interface PostListProps {
  onEdit: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ onEdit }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAll();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const success = await postService.delete(String(id));
        if (success) {
          setPosts(posts.filter((post) => post.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Loading posts...</div>;
  }

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No posts yet. Create your first post!
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                By {post.author} •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(post)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
