import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://khaqwnlllcjtoivmapes.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYXF3bmxsbGNqdG9pdm1hcGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0Mzg2NjcsImV4cCI6MjAzMzAxNDY2N30.Hb-34omxhIzqatQaqacaPMaQ9nlSR0oG2z9CCCSdm9k";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;