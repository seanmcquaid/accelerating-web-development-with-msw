import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { useState } from "react";
import { useDehydratedState } from "use-dehydrated-state";
import env from "./env.server";

export async function loader() {
  return json({
    ENV: {
      ...env,
    },
  });
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const dehydratedState = useDehydratedState();
  const data = useLoaderData<{ ENV: typeof env }>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.process = ${JSON.stringify({
              env: {
                MSW_ENABLED_IN_DEVELOPMENT: data.ENV.MSW_ENABLED_IN_DEVELOPMENT,
                NODE_ENV: data.ENV.NODE_ENV,
              },
            })}`,
          }}
        />
      </head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <body>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </Hydrate>
      </QueryClientProvider>
    </html>
  );
}
