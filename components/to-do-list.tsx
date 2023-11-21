import { ToDo } from './to-do';
import { RadioGroup } from "@/components/ui/radio-group"
import getSupabaseBrowserClient from "@/lib/supabase/server-client"

export async function ToDoList() {
    const todos = await fetchToDos();

    async function fetchToDos() {
        "use server";
        const client = getSupabaseBrowserClient();
        const sessionResponse = await client.auth.getSession();
        const user = sessionResponse.data?.session?.user;
        const { data: todos, error } = await client.from("todos").select().eq("user_id", user?.id).eq("is_complete", false);
        if (error) {
            console.error(error);
        }
        return todos;
    }

    return (
        <RadioGroup>
            {todos && todos.map((todo) => (
                <ToDo key={todo.id} id={todo.id} title={todo.title} />
            ))}
        </RadioGroup>
    )
}