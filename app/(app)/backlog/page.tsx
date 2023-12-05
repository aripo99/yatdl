import { ToDoList } from "@/components/to-do-list"
import AddToDo from "@/components/add-to-do"
import { Separator } from "@/components/ui/separator"

export default function Home() {
    return (
        <div>
            <Separator className="my-8" />
            <p className="mb-6 text-3xl">Backlog</p>
            <AddToDo path="/backlog" />
            <ToDoList path="/backlog" />
        </div>
    )
}