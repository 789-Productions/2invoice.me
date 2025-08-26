import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

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
        return { id: user.id, email: user.email ?? "" };
      },
    }),
    // Add OAuth later, e.g.:
    // GoogleProvider({ clientId: "", clientSecret: "" }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.userId && session.user) {
        session.userId = token.userId as string;
      }
      if (token?.email && session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);