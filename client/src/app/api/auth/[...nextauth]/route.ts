import NextAuth from "next-auth";
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login, register } from '../../../../actions/auth'

export const OPTIONS: NextAuthOptions = {
   providers: [
     CredentialsProvider({
        id: "login",
        name: "Credentials",
        type: "credentials",
        credentials: {
           email: {
              label: "Email",
              type: "email",
              placeholder: "example@example.com"
           },
           password: {
              label: "Password",
              type: "password"
           }
        },
        async authorize(credentials) {
           
           if (!credentials || !credentials.email || !credentials.password) {
              return null;
           } else {
              const res = login(credentials.email, credentials.password);
              return res;
           }
        }
     }),
     CredentialsProvider({
        id: "sign-up",
        name: "Credentials",
        type: "credentials",
        credentials: {
           firstName: {
              label: "FirstName",
              placeholder: "First name"
           },
           lastName: {
              label: "LastName",
              placeholder: "First name"
           },
           email: {
              label: "Email",
              type: "email",
              placeholder: "example@example.com"
           },
           password: {
              label: "Password",
              type: "password"
           },
        },
        async authorize(credentials) {
           
           if (!credentials || !credentials.email || !credentials.password || !credentials.firstName || !credentials.lastName) {
              return null;
           } else {
              const res = register(credentials.firstName, credentials.lastName, credentials.email, credentials.password);
              return res;
           }
        }
     })
  ],
}

export const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST};