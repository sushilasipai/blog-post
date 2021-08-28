import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PostPage } from './post.page';
import { ViewPostPage } from './view-post/view-post.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommentComponent } from './view-post/comment/comment.component';

const routes: Routes = [
  {
    path: '',
    component: PostPage,
  },
  {
    path: ':id',
    component: ViewPostPage,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [PostPage, ViewPostPage, CommentComponent],
  entryComponents: [CommentComponent],
})
export class PostPageModule {}
