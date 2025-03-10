// components/TodoSkeleton.tsx
import React from 'react';

const TodoSkeleton: React.FC = () => (
  <div className="p-4 border rounded-md animate-pulse flex items-center justify-between">
    <div className="flex items-center">
      <div className="w-5 h-5 bg-gray-300 rounded-full mr-3"></div>
      <div className="h-4 bg-gray-300 rounded w-40"></div>
    </div>
    <div className="flex space-x-2">
      <div className="w-12 h-8 bg-gray-300 rounded"></div>
      <div className="w-12 h-8 bg-gray-300 rounded"></div>
    </div>
  </div>
);

export default TodoSkeleton;