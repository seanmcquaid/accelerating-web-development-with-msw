import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import postsService from "~/services/postsService";
import type Post from "~/types/Post";
import { postSchema } from "~/types/Post";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    throw new Error("You need to provide a Post ID!");
  }

  const data = await postsService.getPostById(params.id);

  const validatedData = postSchema.parse(data);

  return { post: validatedData };
};

export default function PostDetailsPage() {
  const { post } = useLoaderData<{ post: Post }>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
