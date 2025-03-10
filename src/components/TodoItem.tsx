// components/TodoItem.tsx
import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded-md flex justify-between items-center">
      <label className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-3 h-5 w-5"
        />
        <span
          className={
            todo.completed
              ? "line-through text-gray-500"
              : "text-gray-900"
          }
        >
          {todo.title}
        </span>
      </label>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(todo)}
          className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;