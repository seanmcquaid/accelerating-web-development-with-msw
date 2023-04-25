import { rest } from "msw";

const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/posts", (_, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: "This is AWESOME!!!",
          body: "It's hard to believe how simple and powerful MSW is!",
          userId: 1,
        },
      ])
    );
  }),
  rest.get("https://jsonplaceholder.typicode.com/posts/1", (_, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        title: "This is AWESOME!!!",
        body: "It's hard to believe how simple and powerful MSW is!",
        userId: 1,
      })
    );
  }),
];

export default handlers;
