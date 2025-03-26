import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and Password are required");
        }

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!user) throw new Error("No user found");

        const isValidPassword = await compare(credentials.password, user.password);
        if (!isValidPassword) throw new Error("Incorrect password");

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") return true;
      if (account.provider === "google") {
        const existingUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (!existingUser) {
          await prisma.user.create({
            data: { name: user.name, email: user.email, password: null },
          });
        }
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    debug: true, // Enable debug mode for more logs
  timeout: 10000,
  },
};

export default (req, res) => NextAuth(req, res, authOptions);
