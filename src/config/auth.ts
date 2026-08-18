import { betterAuth, BetterAuthOptions } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt, bearer } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { env } from './env';

const client = new MongoClient(env.MONGODB_URI);
const db = client.db();

const config = {
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [jwt(), bearer()],
  user: {
    additionalFields: {
      role: {
        type: 'string' as const,
        defaultValue: 'USER',
        input: false, // Prevents client from setting this on registration
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => {
        return bcrypt.hash(password, 10);
      },
      verify: async ({ hash, password }: { hash: string; password: string }) => {
        return bcrypt.compare(password, hash);
      },
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
    },
  },
} satisfies BetterAuthOptions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const auth = betterAuth(config) as any;
