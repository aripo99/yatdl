"use server";

import getSupabaseServerClient from "@/lib/supabase/server-client"
import { revalidatePath } from 'next/cache';
import { getCoins } from "@/lib/actions/get-coins";

export default async function updateToDo(id: string, path: string) {
    const client = getSupabaseServerClient();
    const sessionResponse = await client.auth.getSession();
    const user = sessionResponse.data?.session?.user;

    const { error } = await client.from("todos").update({ is_complete: true }).eq("id", id).eq("user_id", user?.id);

    if (error) {
        console.error(error);
    }

    // Update user coins
    const coins = await getCoins();
    await client.from("user_coins").update({ quantity: coins + 10 }).eq("user_id", user?.id);

    revalidatePath(path, 'page');
}