"use server";

import getSupabaseServerClient from "@/lib/supabase/server-client"

export async function getCoins() {
    const client = getSupabaseServerClient();;
    const sessionResponse = await client.auth.getSession();
    const user = sessionResponse.data?.session?.user;
    const { data, error } = await client.from("user_coins").select().eq("user_id", user?.id).single();
    if (error) {
        console.error(error);
    }
    return data.quantity;
}