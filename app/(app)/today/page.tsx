import { ToDoList } from "@/components/to-do-list"
import AddToDo from "@/components/add-to-do"
import CompletedToDos from "@/components/completed-to-dos"

export default function Home() {
    return (
        <div>
            <p className="mb-6 text-3xl">Today&apos;s To Do&apos;s</p>
            <ToDoList path="/today" />
            <AddToDo path="/today" />
            <CompletedToDos />
        </div>
    )
}
