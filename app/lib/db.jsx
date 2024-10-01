// "use server";
import { createClient } from "@supabase/supabase-js";
// import env from "dotenv";

// env.config();
const KEY = process.env.ANON_KEY;
const URL = process.env.URL;

export const supabase = createClient(URL, KEY);