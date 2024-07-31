import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../@core/services/comment.service';
import { Comment } from '../../../@core/models/comment';

@Component({
  selector: 'ngx-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  newCommentText: string = '';

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentService.comments$.subscribe(comments => {
      this.comments = comments;
    });
  }

  submitComment(commentAddInput: HTMLTextAreaElement): void {
    if (commentAddInput.value.trim() !== '') {
      const newComment: Comment = {
        id: Date.now(),
        text: commentAddInput.value,
        author: 'CurrentUser',
        createdAt: new Date(),
        replies: []
      };
      this.commentService.addComment(newComment);
      commentAddInput.value = ''; // Clear the textarea after submission
    } else {
      alert('Please enter a comment.');
    }
  }

  editComment(comment: Comment): void {
    comment.isEditing = true;
    comment.editText = comment.text;
  }

  updateComment(comment: Comment): void {
    comment.text = comment.editText;
    comment.editedAt = new Date();
    comment.isEditing = false;
    this.commentService.updateComment(comment);
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId);
  }

  addReply(parentCommentId: number, replyInput: HTMLTextAreaElement): void {
    if (replyInput.value.trim() !== '') {
      const reply: Comment = {
        id: Date.now(),
        text: replyInput.value,
        author: 'CurrentUser',
        createdAt: new Date()
      };
      this.commentService.addReply(parentCommentId, reply);
      replyInput.value = ''; // Clear the textarea after submission
    } else {
      alert('Please enter a reply.');
    }
  }

  editReply(reply: Comment, parentComment: Comment): void {
    reply.isEditing = true;
    reply.editText = reply.text;
  }

  updateReply(reply: Comment, parentComment: Comment): void {
    reply.text = reply.editText;
    reply.editedAt = new Date();
    reply.isEditing = false;
    this.commentService.updateReply(parentComment.id, reply);
  }

  deleteReply(replyId: number, parentCommentId: number): void {
    this.commentService.deleteReply(parentCommentId, replyId);
  }
}
