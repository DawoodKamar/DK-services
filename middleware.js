import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
    publicRoutes: ["/", "/About", "/Contact",]
  });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};