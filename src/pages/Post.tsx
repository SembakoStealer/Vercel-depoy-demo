import React, { useState } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import FloatingButton from '../components/FloatingButton';
import { Post } from '../types/post';
import { postService } from '../services/postService';

const PostPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateClick = () => {
    setCurrentPost(undefined);
    setIsEditing(false);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditClick = (post: Post) => {
    setCurrentPost(post);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentPost(undefined);
    setIsEditing(false);
  };

  const handleSubmit = async (postData: Omit<Post, 'id' | 'createdAt'> | Partial<Post>) => {
    try {
      if (isEditing && currentPost) {
        await postService.update(String(currentPost.id), postData);
      } else {
        await postService.create(postData as Omit<Post, 'id' | 'createdAt'>);
      }
      setShowForm(false);
      setCurrentPost(undefined);
      setIsEditing(false);
      // Force refresh the post list
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Posts</h1>
      
      {showForm && (
        <div className="mb-8">
          <PostForm
            post={currentPost}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={isEditing}
          />
        </div>
      )}
      
      <PostList key={refreshKey} onEdit={handleEditClick} />
      
      <FloatingButton onClick={handleCreateClick} />
    </div>
  );
};

export default PostPage;