export class Post {
  postedBy: string;
  post: String;
  likes: String[];
  dislikes: String[];
  comments: [
    {
      commentedBy: String;
      comment: String;
    }
  ];
}
