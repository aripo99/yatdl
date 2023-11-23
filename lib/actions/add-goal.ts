"use server";

import getSupabaseBrowserClient from "@/lib/supabase/server-client"
import { revalidatePath } from 'next/cache';

export default async function addToDo(formData: FormData) {
    const client = getSupabaseBrowserClient();
    const sessionResponse = await client.auth.getSession();
    const user = sessionResponse.data?.session?.user;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const { error } = await client.from("goals").insert([{ title, user_id: user?.id, description }]);
    if (error) {
        console.error(error);
        return { error };
    }
    revalidatePath("/", 'page');
    return { 200: "OK" };
}