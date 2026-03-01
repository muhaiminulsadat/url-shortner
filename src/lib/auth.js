import {betterAuth} from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import connectDB from "./db";

const mongooseInstance = await connectDB();
const client = mongooseInstance.connection.getClient();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },

  trustedOrigins: [
    "https://linkchatai.vercel.app",
    "http://localhost:3000",
    "*",
  ],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 1,
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {},
      },
    },
  },
});

export async function getCurrentUser() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  return result?.user;
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/login");
  }
}
