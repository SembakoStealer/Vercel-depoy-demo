import { useQuery } from "@tanstack/react-query";
import axios from "../Utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

// 🟢 Define the Post interface
interface Post {
  id: number;
  title: string;
  description: string;
  image: string; // Added image property
}

// 🟢 Define the API response structure
interface PostData {
  posts: Post[];
}

// 🟢 Fetch posts from the API
const fetchPostList = async () => {
  return await axios.get<PostData>("/posts");
};

// 🟢 Skeleton Loader (while loading data)
const PostSkeleton = () => {
  return (
    <div className="group relative">
      {/* Image Placeholder */}
      <div className="aspect-square w-full rounded-md bg-gray-200 animate-pulse lg:aspect-auto lg:h-80"></div>

      <div className="mt-4 flex justify-between">
        {/* Title Placeholder */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          {/* Description Placeholder */}
          <div className="mt-1 h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
        {/* Spacer */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>
    </div>
  );
};

// 🟢 Main Post Component
const Post = () => {
  const navigate = useNavigate();
  const getPostList = useQuery({
    queryKey: ["postList"],
    queryFn: fetchPostList,
  });

  return (
    <div className="container mx-auto px-4">
      {/* Add Post Button */}
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      </button>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Latest Posts
          </h2>

          {/* Grid Layout */}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {/* Show Skeletons While Loading */}
            {getPostList.isFetching
              ? Array.from({ length: 4 }).map((_, index) => <PostSkeleton key={index} />)
              : getPostList.data?.data.posts.map((post) => (
                  <div key={post.id} className="group relative" onClick={() => navigate(`/post/${post.id}`)}>
                    {/* 🟢 Post Image */}
                    <img
                      alt={post.title}
                      src={post.image}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    
                    {/* 🟢 Post Title and Description */}
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {post.title}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
