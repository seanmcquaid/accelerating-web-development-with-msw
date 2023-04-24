import type { LoaderArgs } from "@remix-run/node";
import { loader } from "../route";
import type { Params } from "@remix-run/react";
import { ZodError } from "zod";
import server from "~/mocks/server";
import { rest } from "msw";

describe("Post Details Loader", () => {
  it("Throws an error if the returned JSON does not match our schema", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/posts/1",
        (req, res, ctx) => {
          return res(
            ctx.json({
              id: "1",
              title: "My Post",
              body: "This is my post",
              userId: 1,
            })
          );
        }
      )
    );
    try {
      await loader({
        params: { id: "1" } as Params,
      } as LoaderArgs);
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
    }
  });
  it("Successfully returns the JSON for our post if the ID is valid and the JSON matches our schema", async () => {
    const result = await loader({
      params: { id: "1" } as Params,
    } as LoaderArgs);
    expect(result).toEqual({
      post: {
        id: 1,
        title: "My Post",
        body: "This is my post",
        userId: 1,
      },
    });
  });
});
