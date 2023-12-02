"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import addGoal from "@/lib/actions/add-goal"
import { useState } from "react"
import { useCallback, useTransition } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function AddGoal() {
    const [isPending, startTransition] = useTransition();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);

    const onAddGoalRequested = useCallback(() => {
        startTransition(async () => {
            await addGoal(title, description);
            setTitle('');
            setDescription('');
            setOpen(false);
        });
    }, [description, title]);

    const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onAddGoalRequested();
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Button>
                        Add
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a Goal</DialogTitle>
                        <DialogDescription>
                            Goals remind you of the bigger picture. Ideally they help your to dos align with your values.
                        </DialogDescription>
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
                        <Button
                            onClick={handleAddClick}
                            disabled={isPending}
                        >
                            Add
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div >
    );
}