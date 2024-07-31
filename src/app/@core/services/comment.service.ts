import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../../@core/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSubject.asObservable();

  private comments: Comment[] = [];

  constructor() {
    // Initialize with any default comments if necessary
  }

  addComment(comment: Comment): void {
    this.comments.push(comment);
    this.commentsSubject.next(this.comments);
  }

  updateComment(updatedComment: Comment): void {
    const index = this.comments.findIndex(c => c.id === updatedComment.id);
    if (index !== -1) {
      this.comments[index] = updatedComment;
      this.commentsSubject.next(this.comments);
    }
  }

  deleteComment(commentId: number): void {
    this.comments = this.comments.filter(c => c.id !== commentId);
    this.commentsSubject.next(this.comments);
  }

  addReply(parentCommentId: number, reply: Comment): void {
    const parentComment = this.comments.find(c => c.id === parentCommentId);
    if (parentComment) {
      parentComment.replies = parentComment.replies || [];
      parentComment.replies.push(reply);
      this.commentsSubject.next(this.comments);
    }
  }

  updateReply(parentCommentId: number, updatedReply: Comment): void {
    const parentComment = this.comments.find(c => c.id === parentCommentId);
    if (parentComment) {
      const index = parentComment.replies.findIndex(r => r.id === updatedReply.id);
      if (index !== -1) {
        parentComment.replies[index] = updatedReply;
        this.commentsSubject.next(this.comments);
      }
    }
  }

  deleteReply(parentCommentId: number, replyId: number): void {
    const parentComment = this.comments.find(c => c.id === parentCommentId);
    if (parentComment) {
      parentComment.replies = parentComment.replies?.filter(r => r.id !== replyId) || [];
      this.commentsSubject.next(this.comments);
    }
  }
}
