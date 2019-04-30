import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "src/app/model/post";

@Injectable({
  providedIn: "root"
})
export class PostService {
  baseurl = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {}
  getposts() {
    return this.http.get<Post[]>(this.baseurl + "getposts");
  }
  sendPost(newPost) {
    console.log(newPost);
    return this.http.post(this.baseurl + "post", newPost);
  }
  comment(post, id) {
    console.log(post);
    return this.http.put(this.baseurl + "addcomment/" + id, post);
  }
  getPostById(id) {
    return this.http.get<Post>(this.baseurl + "postbyid/" + id);
  }
}
