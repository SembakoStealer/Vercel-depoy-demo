import { Post } from '../types/post';

// Simulating a backend with localStorage
const STORAGE_KEY = 'posts';

// Helper to get posts from localStorage
const getPosts = (): Post[] => {
  const posts = localStorage.getItem(STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

// Helper to save posts to localStorage
const savePosts = (posts: Post[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const postService = {
  getAll: async (): Promise<Post[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getPosts());
      }, 300); // Simulate network delay
    });
  },
  
  getById: async (id: string): Promise<Post | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = getPosts().find(p => String(p.id) === id);
        resolve(post);
      }, 300);
    });
  },
  
  create: async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost: Post = {
          ...post,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        
        const posts = getPosts();
        savePosts([newPost, ...posts]);
        resolve(newPost);
      }, 300);
    });
  },
  
  update: async (id: string, updatedPost: Partial<Post>): Promise<Post | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = getPosts();
        const index = posts.findIndex(p => String(p.id) === id);
        
        if (index !== -1) {
          const updated = { ...posts[index], ...updatedPost };
          posts[index] = updated;
          savePosts(posts);
          resolve(updated);
        } else {
          resolve(undefined);
        }
      }, 300);
    });
  },
  
  delete: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = getPosts();
        const filteredPosts = posts.filter(p => String(p.id) !== id);
        
        if (filteredPosts.length < posts.length) {
          savePosts(filteredPosts);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  }
};