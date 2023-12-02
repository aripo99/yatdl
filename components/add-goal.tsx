"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import addGoal from "@/lib/actions/add-goal"
import { useState } from "react"
import { useCallback, useTransition } from 'react';

export default function AddGoal() {
    const [isAddingGoal, setIsAddingGoal] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onAddGoalRequested = useCallback(() => {
        startTransition(async () => {
            await addGoal(title, description);
            setTitle('');
            setDescription('');
            setIsAddingGoal(false);
        });
    }, [description, title]);

    const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onAddGoalRequested();
    };

    return (
        <>
            {isAddingGoal ? (
                <>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Goal Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    <Input
                        type="text"
                        name="description"
                        placeholder="Goal Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex flex-row space-x-2 justify-between">
                        <Button
                            onClick={() => setIsAddingGoal(false)}
                            variant="ghost"
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddClick}
                            disabled={isPending}
                        >
                            Add
                        </Button>
                    </div>
                </>
            ) : (
                <Button onClick={() => setIsAddingGoal(true)}>
                    Add Goal
                </Button>
            )}
        </>
    );
}