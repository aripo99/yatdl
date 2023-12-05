"use client"

import * as React from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import getCompletedToDos from "@/lib/actions/get-completed-to-dos"
import { useEffect } from "react"
import { FaCoins } from "react-icons/fa"

export default function CompletedToDos() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [completedToDos, setCompletedToDos] = React.useState<any[] | null>(null)

    useEffect(() => {
        const fetchCompletedToDos = async () => {
            const data = await getCompletedToDos();
            setCompletedToDos(data);
        }
        fetchCompletedToDos();
    }, []);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2 mt-8"
        >
            <div className="flex items-center justify-between ">
                <h4 className="text-xl font-semibold">
                    You&apos;ve destroyed {completedToDos && completedToDos.length || 0} to do&apos;s, keep going!
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <CaretSortIcon className="h-4 w-4 " />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
                {completedToDos && completedToDos.map((todo) => (
                    <div key={todo.id} className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm border-green-950 flex items-center space-x-2">
                        <span className="line-through">{todo.title}</span>
                        <FaCoins className="text-yellow-400 ml-2" />
                        <span className="ml-1">x10</span>
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}