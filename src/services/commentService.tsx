// src/services/commentService.tsx

// Define the Comment interface here since the import is not working
interface Comment {
  id: number;
  username: string;
  text: string;
  timestamp: string;
}

// In a real application, this would interact with an API
export class CommentService {
  private static instance: CommentService;
  private comments: Comment[];

  private constructor() {
    // Load from localStorage if available
    const savedComments = localStorage.getItem('comments');
    this.comments = savedComments ? JSON.parse(savedComments) : [];
    
    // If empty, initialize with sample data
    if (this.comments.length === 0) {
      this.comments = [
        {
          id: 1,
          username: "Jane Doe",
          text: "I love chocolate keknya",
          timestamp: "2025-03-09T10:00:00Z",
        },
        {
          id: 2,
          username: "Seth",
          text: "How can i turn the kompor listrik off",
          timestamp: "2025-03-10T12:30:00Z",
        },
        {
          id: 3,
          username: "Joy",
          text: "I am completely lost in this lesson",
          timestamp: "2025-03-10T15:45:00Z",
        },
        {
          id: 4,
          username: "Duolingo Bird",
          text: "Finish your spanish lesson, or else",
          timestamp: "2025-03-10T09:15:00Z",
        },
        {
          id: 5,
          username: "Invincible",
          text: "That is not nice!",
          timestamp: "2025-03-09T07:00:00Z",
        },
      ];
      this.saveToStorage();
    }
  }

  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }

  private saveToStorage(): void {
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  public getAll(): Comment[] {
    return [...this.comments];
  }

  public getById(id: number): Comment | undefined {
    return this.comments.find(comment => comment.id === id);
  }

  public create(comment: Omit<Comment, 'id' | 'timestamp'>): Comment {
    const newComment: Comment = {
      id: this.getNextId(),
      username: comment.username,
      text: comment.text,
      timestamp: new Date().toISOString(),
    };

    this.comments.push(newComment);
    this.saveToStorage();
    return newComment;
  }

  public update(id: number, comment: Partial<Comment>): Comment | null {
    const index = this.comments.findIndex(c => c.id === id);
    if (index === -1) return null;

    this.comments[index] = {
      ...this.comments[index],
      ...comment,
      // Don't allow id to be changed
      id: this.comments[index].id
    };

    this.saveToStorage();
    return this.comments[index];
  }

  public delete(id: number): boolean {
    const initialLength = this.comments.length;
    this.comments = this.comments.filter(comment => comment.id !== id);
    const deleted = initialLength > this.comments.length;
    
    if (deleted) {
      this.saveToStorage();
    }
    
    return deleted;
  }

  private getNextId(): number {
    return Math.max(0, ...this.comments.map(c => c.id)) + 1;
  }
}

export default CommentService.getInstance();