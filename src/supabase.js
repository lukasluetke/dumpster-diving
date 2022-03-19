import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxcebsajvdlnwpmmodab.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTQ1NzczMSwiZXhwIjoxOTU3MDMzNzMxfQ.gt2mp51qKMtSPdwjIEQGionSAPecpBcov2EyEiaa9EA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)