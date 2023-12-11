"use server";

import getSupabaseServerClient from "@/lib/supabase/server-client"
import { revalidatePath } from 'next/cache';

export default async function addToDo(title: string, path: string) {
    const client = getSupabaseServerClient();
    const sessionResponse = await client.auth.getSession();
    const user = sessionResponse.data?.session?.user;

    // parse out the @labels, removing the @
    const matches = title.match(/@(\w+)/g);

    let labels = [];
    if (matches) {
        labels = matches.map(match => match.substring(1));
    }

    if (labels) {
        labels.forEach((label) => {
            title = title.replace("@" + label, "");
        });
    }

    const { error } = await client.from("todos").insert([{ title, user_id: user?.id, category: path.split("/")[1], labels: labels }]);
    if (error) {
        console.error(error);
        return { error };
    }
    revalidatePath(path, 'page');
    return { 200: "OK" };
}