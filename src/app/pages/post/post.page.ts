import { Component, OnInit } from '@angular/core';
import { Post, PostService, PostWithUser } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

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
  /*ngOnInit() {
    this.getAllPosts(1);
  }*/
  ngOnInit() {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
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
