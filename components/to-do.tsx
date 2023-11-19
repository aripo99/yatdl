import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"

interface ToDoProps {
    id: string;
}

export function ToDo({ id }: ToDoProps) {
    return (
        <div className="flex items-center space-x-2">
            <RadioGroupItem value={id} id={id} />
            <Label htmlFor={id}>To Do {id}</Label>
        </div>
    )
}