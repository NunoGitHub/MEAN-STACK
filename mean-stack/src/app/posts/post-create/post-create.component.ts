import { Component } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{

  newPost:any ="NO CONTENT";
  enteredValue:any = "";

  onAddPost(postInput:HTMLTextAreaElement){
   // alert("Post added!")
   console.dir(postInput)
   //this.newPost= 'The user\'s new post';
   this.newPost= postInput.value;
  }


  onAddPostEventBinding(){
    this.newPost= this.enteredValue;
    alert(this.enteredValue)
  }

}
