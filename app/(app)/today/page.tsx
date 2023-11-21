import { ToDoList } from "@/components/to-do-list"
import AddToDo from "@/components/add-to-do"

export default function Home() {
    return (
        <div>
            <p className="mb-6 text-lg">Today - {new Date().toLocaleDateString()}</p>
            <ToDoList />
            <AddToDo />
        </div>
    )
}
