"use client";

import { Label } from "@/components/ui/label"
import updateToDo from "@/lib/actions/update-to-do";
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { FaCheck, FaCoins, FaTimes } from 'react-icons/fa';
import deleteToDo from "@/lib/actions/delete-to-do";
import moveToDo from "@/lib/actions/move-to-do";

interface ToDoProps {
    id: string;
    title: string;
}

export function ToDo({ id, title }: ToDoProps) {
    const pathname = usePathname()

    return (
        <div className="flex justify-between">
            <div className="flex items-center space-x-2">
                <form onSubmit={() => updateToDo(id, pathname)}>
                    <Button
                        variant="ghost"
                        type="submit"
                    >
                        <FaCheck className="text-green-500" />
                    </Button>
                </form>
                <Label htmlFor={id}>{title}</Label>
                <FaCoins className="text-yellow-400" />
                <span className="ml-1">x10</span>
            </div>
            <div className="flex flex-row">
                <form onSubmit={() => moveToDo(id, pathname)}>
                    <Button variant="ghost" className="text-red-500">
                        <FaTimes />
                    </Button>
                </form>
                <form onSubmit={() => deleteToDo(id)}>
                    <Button variant="ghost" className="text-red-500">
                        <FaTimes />
                    </Button>
                </form>
            </div>
        </div>
    )
}