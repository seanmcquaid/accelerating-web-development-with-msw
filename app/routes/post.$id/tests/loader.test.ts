import type { LoaderArgs } from "@remix-run/node";
import { loader } from "../route";
import type { Params } from "@remix-run/react";
import postsService from "~/services/postsService";
import type { MockedFunction } from "vitest";
import { ZodError } from "zod";

vi.mock("~/services/postsService");

const mockGetPostById = postsService.getPostById as MockedFunction<
  typeof postsService.getPostById
>;

describe("Post Details Loader", () => {
  it("Throws an error if the returned JSON does not match our schema", async () => {
    mockGetPostById.mockResolvedValueOnce({
      id: "",
      title: "My Post",
      body: "This is my post",
      userId: 1,
    } as any);
    try {
      await loader({
        params: { id: "1" } as Params,
      } as LoaderArgs);
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
    }
  });
  it("Successfully returns the JSON for our post if the ID is valid and the JSON matches our schema", async () => {
    mockGetPostById.mockResolvedValueOnce({
      id: 1,
      title: "My Post",
      body: "This is my post",
      userId: 1,
    });
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
