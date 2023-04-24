import { Link, type V2_MetaFunction } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import postsService from "~/services/postsService";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix + MSW" }];
};

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => postsService.getPosts(),
  });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Hey Remix Conf!</h1>
      <p>
        Below you'll see a list of posts from the JSONPlaceholder API that we
        are calling on the client wtih React Query.
      </p>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
