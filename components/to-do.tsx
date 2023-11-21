"use client";

import { Label } from "@/components/ui/label"
import updateToDo from "@/lib/actions/update-to-do";
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { FaCheck } from 'react-icons/fa';

interface ToDoProps {
    id: string;
    title: string;
}

export function ToDo({ id, title }: ToDoProps) {
    const pathname = usePathname()

    return (
        <div className="flex items-center space-x-2">
            <form action={() => updateToDo(id, pathname)}>
                <Button
                    variant="ghost"
                    type="submit"
                >
                    <FaCheck className="text-green-500" />
                </Button>
                <Label htmlFor={id}> {title} </Label>
            </form>
        </div>
    )
}