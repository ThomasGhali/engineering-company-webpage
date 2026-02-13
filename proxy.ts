import authConfig from './auth.config';
import NextAuth from 'next-auth';

// Use only one of the two proxy options below
// 1. Use proxy directly
// export const { auth: proxy } = NextAuth(authConfig)

// 2. Wrapped proxy option
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Ignore these matching paths
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|mp4)$).*)',
  ],
};
