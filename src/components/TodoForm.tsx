// components/TodoForm.tsx
import React, { useState, useEffect } from 'react';
import { Todo, NewTodoInput } from '../types/todo';

interface TodoFormProps {
  onSubmit: (todo: NewTodoInput | Todo) => void;
  initialData?: Todo;
  isEditing: boolean;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCompleted(initialData.completed);
    } else {
      setTitle('');
      setCompleted(false);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (isEditing && initialData) {
      onSubmit({
        id: initialData.id,
        title: title.trim(),
        completed
      });
    } else {
      onSubmit({
        title: title.trim(),
        completed
      });
    }
    
    if (!isEditing) {
      setTitle('');
      setCompleted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-md bg-gray-50">
      <h3 className="font-medium mb-3">{isEditing ? 'Edit Todo' : 'Add New Todo'}</h3>
      <div className="flex flex-col space-y-3">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter todo title..."
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-5 w-5 mr-2"
          />
          <label htmlFor="completed" className="text-sm text-gray-700">
            Mark as completed
          </label>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
          
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TodoForm;