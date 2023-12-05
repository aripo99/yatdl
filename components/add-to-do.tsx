"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import addToDo from "../lib/actions/add-to-do"
import { useState } from "react"

interface AddToDoProps {
    path: string;
}

export default function AddToDo(props: AddToDoProps) {
    const [title, setTitle] = useState('');

    const handleAddClick = async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        await addToDo(title, props.path);
        setTitle('');
    }

    return (
        <div className="flex flex-row mt-6">
            <Input
                type="text"
                name="title"
                className="rounded-md p-2"
                placeholder="Add a new todo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent form submission
                        handleAddClick(e);
                    }
                }}
            />
            <Button className="ml-2" onClick={handleAddClick}>
                Add
            </Button>
        </div>
    )
}
