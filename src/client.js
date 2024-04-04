import { createClient } from '@supabase/supabase-js'
const URL = 'https://bbrfthogntatpwsfxcbp.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicmZ0aG9nbnRhdHB3c2Z4Y2JwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjE1Nzk4MCwiZXhwIjoyMDI3NzMzOTgwfQ.d0L6itchsBXPj_1y1rjeXVcY2hLuVyJdbToUgef2UBg';

export const supabase = createClient(URL, API_KEY);
