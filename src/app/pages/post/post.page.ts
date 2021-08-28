import { Component, OnInit } from '@angular/core';
import { Post, PostService, PostWithUser } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) {}

  posts: PostWithUser[];
  loadComplete: boolean = false;
  ngOnInit() {
    this.getAllPosts(1);
  }

  loadMorePosts() {
    this.getAllPosts(this.posts.length / 10 + 1);
  }

  getAllPosts(set) {
    this.postService
      .getAllPosts(set)
      .pipe(
        mergeMap((posts) => {
          return forkJoin(
            posts.map((post) => {
              return this.userService.getUserById(post.userId).pipe(
                map((user) => {
                  return { ...post, user };
                })
              );
            })
          );
        })
      )
      .subscribe((res: PostWithUser[]) => {
        this.posts = res;
        if (this.posts.length === 100) {
          this.loadComplete = true;
        }
      });
  }

  viewPost(id) {
    this.router.navigate(['/posts', id]);
  }
}
