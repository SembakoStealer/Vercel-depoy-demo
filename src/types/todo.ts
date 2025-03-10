// types/todo.ts
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export interface NewTodoInput {
    title: string;
    completed: boolean;
  }