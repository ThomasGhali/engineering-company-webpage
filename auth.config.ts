import type { NextAuthConfig } from 'next-auth';

export default {
  pages: {
    signIn: '/admin/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      const publicRoutes = ['/', '/contact-us', '/admin/sign-in'];

      const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + '/'),
      );

      if (!isPublicRoute && !isLoggedIn) {
        return false;
      }
      
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
