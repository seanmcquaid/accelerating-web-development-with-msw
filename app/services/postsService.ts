import type Post from "~/types/Post";

const postsService = {
  getPosts: (): Promise<Post[]> =>
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    ),
  getPostById: (id: string): Promise<Post> =>
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
      res.json()
    ),
} as const;

export default postsService;
