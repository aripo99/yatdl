import { ToDo } from './to-do';
import { RadioGroup } from "@/components/ui/radio-group"

export function ToDoList() {
    return (
        <RadioGroup>
            <ToDo id="r1" />
            <ToDo id="r2" />
            <ToDo id="r3" />
        </RadioGroup>
    )
}