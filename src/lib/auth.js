import {betterAuth} from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import connectDB from "./db";

// ✅ Lazy — only runs when auth is actually used, not at build time
const getAuth = async () => {
  const mongooseInstance = await connectDB();
  const client = mongooseInstance.connection.getClient();
  const db = client.db();

  return betterAuth({
    database: mongodbAdapter(db, {client}),
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60 * 60,
      },
    },
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
};

// ✅ Cache the instance so DB doesn't reconnect on every request
let authInstance = null;

export const auth = new Proxy(
  {},
  {
    get(_, prop) {
      return new Proxy(
        {},
        {
          get(_, innerProp) {
            return async (...args) => {
              if (!authInstance) authInstance = await getAuth();
              return authInstance[prop][innerProp](...args);
            };
          },
        },
      );
    },
  },
);

export async function getCurrentUser() {
  if (!authInstance) authInstance = await getAuth();
  const result = await authInstance.api.getSession({
    headers: await headers(),
  });
  return result?.user;
}

export async function signOut() {
  if (!authInstance) authInstance = await getAuth();
  const result = await authInstance.api.signOut({
    headers: await headers(),
  });
  if (result.success) redirect("/login");
}
