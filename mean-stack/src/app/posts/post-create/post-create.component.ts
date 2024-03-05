import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredContent: any = '';
  enteredTitle: any = '';
  @Output()
  postCreated = new EventEmitter();

  onAddPost() {
    // alert("Post added!")
    // console.dir(postInput)
    //this.newPost= 'The user\'s new post';
    // this.newPost= postInput.value;
    const post = { title: this.enteredTitle, content: this.enteredContent };
    this.postCreated.emit(post);
    this.enteredContent = '';
    this.enteredTitle = '';

  }
}
