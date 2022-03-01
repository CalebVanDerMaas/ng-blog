import { Component, Injectable, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  title!: string
  image: string = 'null'
  content!: string

  buttonText: string = "Create Post";

  uploadPercent!: Observable<any>
  downloadURL!: Observable<any> 

  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage) { }

  ngOnInit(){
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email, 
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    }
    this.postService.create(data)
    this.title = ''
    this.content = ''
    this.buttonText = 'Post Created!'
    setTimeout(() => (this.buttonText = "Create Post"), 3000);

  }

  async uploadImage(event: any) {
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    if (file.type.split('/')[0] !== 'image'){
      return alert("Only image files.")
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(
      finalize(() => {
      this.downloadURL = ref.getDownloadURL()
      this.downloadURL.subscribe(url => (this.image = url));
})
)
.subscribe();

    }
  }

}
