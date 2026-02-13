import { getUserFromDb } from '@/lib/auth.action';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      authorize: async (credentials) => {
        let user = null;

        const parsedCredentials = z
          .object({
            username: z.string().min(1, 'username is required'),
            password: z.string().min(1, 'password is required'),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          user = await getUserFromDb(username);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch)
            return {
              name: user.name,
              tokenVersion: user.tokenVersion,
              username: user.username,
            };

          return null;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/sign-in', // Redirect the unauthenticated admin here
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // Token expires after 1 week
    updateAge: 60 * 60, // Update every 1 hour
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tokenVersion = user.tokenVersion;
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }) {
      // Extract and type-narrow token properties
      const username = token.username as string | undefined;
      const tokenVersion = token.tokenVersion as number | undefined;

      if (username && tokenVersion !== undefined && session.user) {
        const dbUser = await getUserFromDb(username);

        // If user doesn't exist or token version doesn't match, invalidate the session
        if (!dbUser || dbUser.tokenVersion !== tokenVersion) {
          return { ...session, user: undefined };
        }
      }

      return session;
    },
  },
});
