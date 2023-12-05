import { ToDo } from './to-do';
import { RadioGroup } from "@/components/ui/radio-group"
import fetchToDos from "@/lib/actions/get-to-dos"

interface ToDoListProps {
    path: string;
}

export async function ToDoList({ path }: ToDoListProps) {
    const todos = await fetchToDos(path);

    return (
        <RadioGroup>
            {todos && todos.map((todo) => (
                <ToDo key={todo.id} id={todo.id} title={todo.title} />
            )).reverse()}
        </RadioGroup>
    )
}