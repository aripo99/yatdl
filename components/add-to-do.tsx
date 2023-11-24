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

    const handleAddClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await addToDo(title, props.path);
        setTitle('');
    }

    return (
        <>
            <Input type="text" name="title" className="rounded-md p-2" placeholder="Add a new todo" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button className="mt-2" onClick={handleAddClick}>Add</Button>
        </>
    )
}
