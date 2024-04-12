import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"

import CredentialsProvider from 'next-auth/providers/credentials'
import { login, register } from '@/actions/auth'

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        } else {
          const res = login(credentials.email, credentials.password);
          return res;
        }
      },
    }),
    CredentialsProvider({
      id: "sign-up",
      name: "Credentials",
      type: "credentials",
      credentials: {
        firstName: {
          label: "FirstName",
          placeholder: "First name",
        },
        lastName: {
          label: "LastName",
          placeholder: "First name",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          !credentials.email ||
          !credentials.password ||
          !credentials.firstName ||
          !credentials.lastName
        ) {
          return null;
        } else {
          const res = register(
            credentials.firstName,
            credentials.lastName,
            credentials.email,
            credentials.password
          );
          return res;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.name = user.firstName + " " + user.lastName
        token.id = user._id
      }

      console.log(token);
      return token;
    },
    async session({ session, token }) {
      // I skipped the line below coz it gave me a TypeError
      // session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config)
}