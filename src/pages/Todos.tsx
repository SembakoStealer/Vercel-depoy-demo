// pages/Todos.tsx
import React, { useState, useEffect } from 'react';
import { Todo, NewTodoInput } from '../types/todo';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import TodoSkeleton from '../components/TodoSkeleton';

// Initial Todo Data
const initialTodos: Todo[] = [
  { id: 1, title: "Beli Sabun", completed: false },
  { id: 2, title: "Makan Nasi Padangzz", completed: true },
  { id: 3, title: "Men Gem", completed: false },
  { id: 4, title: "Turu Geming", completed: true },
  { id: 5, title: "Turu lagi", completed: false },
];

const Todos: React.FC = () => {
  // State for todos and loading simulation
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  
  // Generate a new unique ID for todos
  const generateId = (): number => {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  };

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setTodos(initialTodos);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        if (Array.isArray(parsedTodos) && parsedTodos.length > 0) {
          setTodos(parsedTodos);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error parsing todos from localStorage', error);
      }
    }
  }, []);

  // Create a new todo
  const handleCreateTodo = (newTodoInput: NewTodoInput) => {
    const newTodo: Todo = {
      id: generateId(),
      ...newTodoInput
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  // Update an existing todo
  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
    setEditingTodo(null);
  };

  // Delete a todo
  const handleDeleteTodo = (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }
  };

  // Toggle todo completion status
  const handleToggleTodo = (id: number) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handle form submission for both create and update
  const handleSubmit = (todo: NewTodoInput | Todo) => {
    if ('id' in todo) {
      handleUpdateTodo(todo as Todo);
    } else {
      handleCreateTodo(todo as NewTodoInput);
    }
  };

  // Edit todo handler
  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-6">
          Todo Manager
        </h1>
        
        {/* Todo Form */}
        <TodoForm 
          onSubmit={handleSubmit} 
          initialData={editingTodo || undefined} 
          isEditing={!!editingTodo}
          onCancel={handleCancelEdit}
        />
        
        <h2 className="text-xl font-semibold mt-6 mb-4">My Todos</h2>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <TodoSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* Empty State */}
            {todos.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No todos yet. Add one above!
              </div>
            ) : (
              /* Todo List */
              <div className="space-y-3">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTodo}
                  />
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Status Summary */}
        {!isLoading && todos.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 flex justify-between">
            <span>Total: {todos.length}</span>
            <span>Completed: {todos.filter(todo => todo.completed).length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;