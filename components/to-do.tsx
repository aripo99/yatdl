"use client";

import { Label } from "@/components/ui/label"
import updateToDo from "@/lib/actions/update-to-do";
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { FaCheck, FaCoins, FaTimes, FaExchangeAlt } from 'react-icons/fa';
import deleteToDo from "@/lib/actions/delete-to-do";
import moveToDo from "@/lib/actions/move-to-do";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"

interface ToDoProps {
    id: string;
    title: string;
}

export function ToDo({ id, title }: ToDoProps) {
    const pathname = usePathname()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    function handleCompleteToDo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsCompleted(true)
        setIsProcessing(true)
        updateToDo(id, pathname)
    }

    function handleMoveToDo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsProcessing(true)
        moveToDo(id, pathname)
    }

    function handleDeleteToDo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsProcessing(true)
        deleteToDo(id)
    }

    return (
        <div className="flex justify-between">
            <div className="flex items-center space-x-2">
                <form onSubmit={handleCompleteToDo}>
                    <Button
                        variant="ghost"
                        type="submit"
                        disabled={isProcessing}
                    >
                        <FaCheck className="text-green-500" />
                    </Button>
                </form>
                <Label htmlFor={id} className={`${isCompleted ? 'line-through' : ''}`}>
                    {title}
                </Label>
                <FaCoins className="text-yellow-400" />
                <span className="ml-1">x10</span>
            </div>
            <div className="flex flex-row">
                <form onSubmit={handleMoveToDo}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="ghost" disabled={isProcessing}>
                                    <FaExchangeAlt />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                                {pathname === '/today' ? 'Move to backlog' : 'Move to today'}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </form>
                <form onSubmit={handleDeleteToDo}>
                    <Button variant="ghost" className="text-red-500" disabled={isProcessing}>
                        <FaTimes />
                    </Button>
                </form>
            </div>
        </div>
    )
}