/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DefaultSession, NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },
    session({ token, user, session }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    // Credencial para usuario y contraseña
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
