import { rest } from "msw";

const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: "My Post",
          body: "This is my post",
          userId: 1,
        },
      ])
    );
  }),
  rest.get("https://jsonplaceholder.typicode.com/posts/1", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        title: "My Post",
        body: "This is my post",
        userId: 1,
      })
    );
  }),
];

export default handlers;
