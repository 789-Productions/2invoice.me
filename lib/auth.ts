import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import bcrypt from "bcryptjs";
import { getUserById } from './data';

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: creds.email as string } });
        if (!user || !user?.passwordHash) throw new Error("No user found with this email.");
        const ok = await bcrypt.compare(creds.password as string, user.passwordHash);
        if (!ok) throw new Error("Invalid password.");
        return { id: user.id, email: user.email ?? "", image: user.image ?? "" };
      },
    }),
    // Add OAuth later, e.g.:
    // GoogleProvider({ clientId: "", clientSecret: "" }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.image = user.image;
      }
      const userFromDb = await getUserById(token.userId as string);
      if (!userFromDb) return token; // user not found

      token.name = userFromDb.name;
      token.image = userFromDb.image;
      return token;
    },
    async session({ session, token }) {
      if (token?.userId && session.user) {
        session.userId = token.userId as string;
      }
      if (token?.email && session.user) {
        session.user.email = token.email as string;
      }
      if (token?.image && session.user) {
        session.user.image = token.image as string;
      }
      return session;
    },
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);