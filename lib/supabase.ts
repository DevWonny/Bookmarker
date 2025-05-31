import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
console.log("🚀 ~ process.env.NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
console.log("🚀 ~ process.env.NEXT_PUBLIC_SUPABASE_KEY:", process.env.NEXT_PUBLIC_SUPABASE_KEY)

export const supabase = createClient(url, key);