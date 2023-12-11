"use client"

import { ToDo } from './to-do'
import { RadioGroup } from "@/components/ui/radio-group"
import fetchToDos from "@/lib/actions/get-to-dos"
import { useState, useEffect } from "react"

interface ToDoListProps {
    path: string;
    label: string;
}

interface ToDo {
    id: string;
    title: string;
}

export function FilteredToDoList({ path, label }: ToDoListProps) {
    const [todos, setTodos] = useState<ToDo[]>([]);

    useEffect(() => {
        const getToDos = async () => {
            const response = await fetchToDos(path, label);
            setTodos(response);
        }
        getToDos();
    }, [path, label]);

    return (
        <>
            <RadioGroup>
                {todos && todos.map((todo) => (
                    <ToDo key={todo.id} id={todo.id} title={todo.title} />
                )).reverse()}
            </RadioGroup>
        </>
    )
}