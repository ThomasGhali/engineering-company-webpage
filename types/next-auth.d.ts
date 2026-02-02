import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the User interface to include custom properties
   */
  interface User {
    tokenVersion: number;
    username: string;
  }

  /**
   * Extend the Session interface to include custom properties
   */
  interface Session {
    user: {
      tokenVersion?: number;
      username?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the JWT interface to include custom properties
   */
  interface JWT {
    tokenVersion?: number;
    username?: string;
  }
}
