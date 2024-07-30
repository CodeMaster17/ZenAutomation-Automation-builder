import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/clerk-webhook",
  "/api/drive-activity/notification",
  "/api/payment/success",
]);

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);
// export default clerkMiddleware({

//   ignoredRoutes: [
//     "/api/auth/callback/discord",
//     "/api/auth/callback/notion",
//     "/api/auth/callback/slack",
//     "/api/flow",
//     "/api/cron/wait",
//   ],
// });

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
