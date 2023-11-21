import { ToDoList } from "@/components/to-do-list"
import AddToDo from "@/components/add-to-do"

export default function Home() {
    return (
        <div>
            <p className="mb-6 text-lg">
                Plan for Tomorrow - {new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()}
            </p>
            <ToDoList />
            <AddToDo path="plan" />
        </div>
    )
}
