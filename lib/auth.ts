import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      verified: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role: string;
    verified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    verified: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@primeestate.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For demo purposes, hardcode admin if not in DB, 
        // in production this should check against hashed passwords in Prisma
        if (credentials.email === "admin@primeestate.com" && credentials.password === "admin123") {
          return {
            id: "admin-1",
            name: "Admin User",
            email: "admin@primeestate.com",
            role: "ADMIN",
            verified: true, // Admins are always verified
          };
        }

        // Hardcode agent for testing
        if (credentials.email === "agent@primeestate.com" && credentials.password === "agent123") {
          return {
            id: "agent-1",
            name: "Test Agent",
            email: "agent@primeestate.com",
            role: "AGENT",
            verified: false, // Set to false for testing the unverified flow
          };
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          verified: (user as Record<string, unknown>).verified as boolean ?? false,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.verified = user.verified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.verified = token.verified;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
};
