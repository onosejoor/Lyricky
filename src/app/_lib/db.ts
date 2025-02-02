// Used supabase for Lyricky-v1, updated to MongoDB for v2

// import { createClient, SupabaseClient } from "@supabase/supabase-js";

// const KEY = process.env.ANON_KEY!;
// const URL = process.env.URL!;

// let supabaseClient: SupabaseClient;

// const getSupabaseClient = () => {
//   if (!supabaseClient) {
//     supabaseClient = createClient(URL, KEY);
//   }
//   return supabaseClient;
// };

// export const supabase = getSupabaseClient()

import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_CONNECTION_STRING || "";

if (!MONGODB_URL) {
  throw new Error("No MongoDB url is provided in the .env file!");
}

let cached_connection = global.mongoose;

if (!cached_connection) {
  cached_connection = global.mongoose = { promise: null, conn: null };
}

async function dbConnect() {
  if (cached_connection.conn) {
    return cached_connection.conn;
  }
  if (!cached_connection.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached_connection.promise = mongoose
      .connect(MONGODB_URL, opts)
      .then((mongoose) => {
        console.log("MongoDB connected!");
        return mongoose;
      });
  }
  try {
    cached_connection.conn = await cached_connection.promise;
  } catch (e) {
    cached_connection.promise = null;
    throw e;
  }

  return cached_connection.conn;
}
export default dbConnect