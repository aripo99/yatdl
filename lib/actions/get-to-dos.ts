"use server";

import getSupabaseServerClient from "@/lib/supabase/server-client"

async function fetchToDos(path: string, label: string) {
    const client = getSupabaseServerClient();
    const sessionResponse = await client.auth.getSession();
    const user = sessionResponse.data?.session?.user;

    let query = client.from("todos")
        .select()
        .eq("user_id", user?.id)
        .eq("is_complete", false)
        .eq("category", path.split("/")[1]);

    if (label !== "") {
        query = query.eq("label", label);
    }
    console.log("here", label);

    const { data: todos, error } = await query;

    if (error) {
        console.error(error);
    }
    return todos;
}

export default fetchToDos;