import { ToDoList } from "@/components/to-do-list"
import AddToDo from "@/components/add-to-do"
import CompletedToDos from "@/components/completed-to-dos"
import { Separator } from "@/components/ui/separator"

export default function Home() {
    return (
        <div>
            <Separator className="my-8" />
            <p className="mb-6 text-3xl">Today&apos;s To Do&apos;s</p>
            <AddToDo path="/today" />
            <ToDoList path="/today" />
            <Separator className="my-8" />
            <CompletedToDos />
        </div>
    )
}
