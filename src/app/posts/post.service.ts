import { Injectable } from '@angular/core';
import { 
  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument 
} from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  postsCollection: AngularFirestoreCollection<any>
  postDoc!: AngularFirestoreDocument<any>

  constructor(private afs: AngularFirestore) { 
    this.postsCollection = this.afs.collection('posts', ref => 
    ref.orderBy('published', 'desc'))
  }

  getPosts() {
    return this.postsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post
        const id = a.payload.doc.id
        return { id, ...data }
      })
    })
    )}

    getPostData(id: string){
      this.postDoc = this.afs.doc<Post>(`posts/${id}`)
      return this.postDoc.valueChanges()
    }

    create(data: Post){
      this.postsCollection.add(data)
    }

    getPost(id: string){
      return this.afs.doc<Post>(`posts/${id}`)
    }

    update(id: string, formData: any){
      return this.getPost(id).update(formData)
    }

    delete(id: string){
      return this.getPost(id).delete()
    }
}