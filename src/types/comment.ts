// src/types/comment.ts

export interface Comment {
    id: number;
    username: string;
    text: string;
    timestamp: string;
  }
  
  export interface CommentFormData {
    username: string;
    text: string;
  }