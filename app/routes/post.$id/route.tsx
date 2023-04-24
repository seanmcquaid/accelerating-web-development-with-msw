import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, type V2_MetaFunction } from "@remix-run/react";
import type Post from "~/types/Post";
import { postSchema } from "~/types/Post";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix + MSW" }];
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    throw new Error("You need to provide a Post ID!");
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  if (!response.ok) {
    throw new Error(
      `Status Code : ${response.status} - ${response.statusText}`
    );
  }

  const data = (await response.json()) as Post;

  const validatedData = postSchema.parse(data);

  return json({
    post: validatedData,
  });
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
