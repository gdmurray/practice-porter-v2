import { defineMiddleware } from "astro:middleware";
import { appendVaryAccept, prefersMarkdown } from "./lib/accept";

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.prefersMarkdown = prefersMarkdown(
    context.request.headers.get("accept"),
  );

  const response = await next();
  appendVaryAccept(response.headers);
  return response;
});
