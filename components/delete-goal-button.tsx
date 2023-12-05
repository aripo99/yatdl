"use client"

import { Button } from "@/components/ui/button"
import deleteGoal from "@/lib/actions/delete-goal"
import { FaTimes } from "react-icons/fa"

export default function DeleteGoalButton({ id }: { id: string }) {
    return (
        <form action={() => deleteGoal(id)}>
            <Button variant="ghost" className="absolute top-[-25px] right-[-25px] text-red-500">
                <FaTimes />
            </Button>
        </form>
    )
}