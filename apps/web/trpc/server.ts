import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../api/src/common/trpc/trpc.router";

/**
 * Create a tRPC client specifically for Next.js Server Components.
 * Makes direct HTTP requests to the external NestJS API.
 */
export const trpcServerClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/trpc`,
      /**
       * Optional: Add headers here if needed for authentication, etc.
       * You might need to fetch cookies or tokens server-side.
       * Example:
       * headers() {
       *   // const token = await getAuthTokenServerSide(); // Your logic here
       *   return {
       *     // authorization: `Bearer ${token}`,
       *   };
       * }
       */
    }),
  ],
});
