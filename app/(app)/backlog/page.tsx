import { ToDoList } from "@/components/to-do-list"
import { Separator } from "@/components/ui/separator"

export default function Home() {
    return (
        <div>
            <Separator className="my-8" />
            <p className="mb-6 text-3xl">Backlog</p>
            <ToDoList path="/backlog" />
        </div>
    )
}