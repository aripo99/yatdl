import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import addToDo from "../lib/actions/add-to-do";

interface AddToDoProps {
    path: string;
}

export default function AddToDo(props: AddToDoProps) {
    return (
        <form action={addToDo} className="mt-4 flex flex-row">
            <input type='hidden' name='path' value={props.path} />
            <Input type="text" name="title" className="rounded-md p-2" placeholder="Add a new todo" />
            <Button className="ml-2">Add</Button>
        </form>
    )
}
