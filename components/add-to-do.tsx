import getSupabaseBrowserClient from "@/lib/supabase/server-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AddToDo() {
    async function addToDo(formData: FormData) {
        "use server";
        const client = getSupabaseBrowserClient();
        const sessionResponse = await client.auth.getSession();
        const user = sessionResponse.data?.session?.user;
        const title = formData.get("title") as string;
        const { error } = await client.from("todos").insert([{ title, user_id: user?.id }]);
        if (error) {
            console.error(error);
        }
    }

    return (
        <form action={addToDo} className="mt-4 flex flex-row">
            <Input type="text" name="title" className="rounded-md p-2" placeholder="Add a new todo" />
            <Button className="ml-2">Add</Button>
        </form>
    )
}
