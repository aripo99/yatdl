"use server";

import getSupabaseServerClient from "@/lib/supabase/server-client"
import { revalidatePath } from 'next/cache';

export default async function moveToDo(id: string, path: string) {
    const client = getSupabaseServerClient();
    const sessionResponse = await client.auth.getSession();
    const user = sessionResponse.data?.session?.user;
    const newCategory = path === "/today" ? "backlog" : "today";
    console.log(newCategory, path);
    const { error } = await client.from("todos").update({ category: newCategory }).eq("id", id).eq("user_id", user?.id);

    if (error) {
        console.error(error);
    }
    revalidatePath(path, 'page');
}