// export { default } from "next-auth/middleware"; 
// export const config = {
//     matcher: ["/admin/:path*", "/user/:path*"],
//   }; To check the authorization for admin panel and user panel
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
   // console.log("token: ", req.nextauth.token);

    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
      return NextResponse.redirect(
        //new URL("/auth/login?message=You Are Not Authorized!", req.url)
        //here we can we also write NextResponse.rewrite on this case the user will be move 
        //into "/" page but url will be admin/panel
        new URL("/",req.url)
      );
    if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user")
      return NextResponse.redirect(
        new URL("/",req.url)
        // new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
    matcher: ["/admin/:path*", "/user/:path*"],
  };