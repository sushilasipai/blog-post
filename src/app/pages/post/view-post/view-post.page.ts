import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostService, PostWithUser } from 'src/app/services/post.service';
import { tap, switchMap, mergeMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { CommentService, Comment } from 'src/app/services/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  post: PostWithUser;
  postId: number;
  comments: Comment[];
  commentComplete: boolean = false;
  ngOnInit() {
    this.getPostById();
  }

  getPostById() {
    this.route.params
      .pipe(
        tap((params) => {
          this.postId = params.id;
          this.getCommentById(this.postId, 1);
        }),
        switchMap(() => this.postService.getPostById(this.postId)),
        mergeMap((post) => {
          return this.userService.getUserById(post.userId).pipe(
            map((user) => {
              return { ...post, user } as PostWithUser;
            })
          );
        })
      )
      .subscribe((res) => {
        this.post = res;
      });
  }

  getCommentById(postId, set) {
    this.commentService.getAllComments(postId, set).subscribe((res) => {
      this.comments = res;
    });
  }

  loadMoreComments() {
    this.getCommentById(this.postId, 2);
    this.commentComplete = true;
  }
}
