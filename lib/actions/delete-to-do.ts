"use server";

import getSupabaseServerClient from "@/lib/supabase/server-client"
import { revalidatePath } from 'next/cache';

export default async function deleteToDo(id: string) {
    const client = getSupabaseServerClient();
    const sessionResponse = await client.auth.getSession();
    const user = sessionResponse.data?.session?.user;
    const { error } = await client.from("todos").delete().eq("id", id).eq("user_id", user?.id);
    if (error) {
        console.error(error);
        return { error };
    }
    revalidatePath("/", 'page');
    return { 200: "OK" };
}