import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
Postts: Post[] = [];
showForm = false;
errorMessage = '';
posts: any;

constructor(private http: HttpClient) {}

ngOnInit() {
  this.fetchPosts();
}

fetchPosts() {
  this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .subscribe({
      next: (data) => this.posts = data,
      error: () => this.errorMessage = 'Failed to load posts'
    });
}


newPost: Post = {
  title: '',
  body: ''
};

addPost() {
  this.errorMessage = '';

  this.http.post<any>(
    'https://jsonplaceholder.typicode.com/posts',
    this.newPost
  ).subscribe({
    next: (res) => {
      this.posts.unshift(res);
      this.showForm = false;
      this.newPost = { title: '', body: '' };
    },
    error: () => {
      this.errorMessage = 'Adding post failed';
    }
  });
}

}
