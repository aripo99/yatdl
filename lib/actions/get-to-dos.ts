"use server";

import getSupabaseServerClient from "@/lib/supabase/server-client"

async function fetchToDos(path: string) {
    const client = getSupabaseServerClient();
    const sessionResponse = await client.auth.getSession();
    const user = sessionResponse.data?.session?.user;
    const { data: todos, error } = await client.from("todos").select().eq("user_id", user?.id).eq("is_complete", false).eq("category", path.split("/")[1]);

    if (error) {
        console.error(error);
    }
    return todos;
}

export default fetchToDos;