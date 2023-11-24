import { ToDo } from './to-do';
import { RadioGroup } from "@/components/ui/radio-group"
import getSupabaseServerClient from "@/lib/supabase/server-client"

interface ToDoListProps {
    path: string;
}

export async function ToDoList({ path }: ToDoListProps) {
    const todos = await fetchToDos(path);

    async function fetchToDos(path: string) {
        "use server";
        const client = getSupabaseServerClient();
        const sessionResponse = await client.auth.getSession();
        const user = sessionResponse.data?.session?.user;
        const { data: todos, error } = await client.from("todos").select().eq("user_id", user?.id).eq("is_complete", false).eq("category", path.split("/")[1]);

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