import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"

interface ToDoProps {
    id: string;
    title: string;
}

export function ToDo({ id, title }: ToDoProps) {
    return (
        <div className="flex items-center space-x-2">
            <RadioGroupItem value={id} id={id} />
            <Label htmlFor={id}> {title} </Label>
        </div>
    )
}