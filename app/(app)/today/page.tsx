import { ToDoList } from "@/components/to-do-list"

export default function Home() {
    return (
        <div>
            <p className="mb-6 text-lg">Today - {new Date().toLocaleDateString()}</p>
            <ToDoList />
        </div>
    )
}
