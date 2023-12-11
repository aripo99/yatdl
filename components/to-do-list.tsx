"use client"

import { FilteredToDoList } from "@/components/filtered-to-do-list"
import { LabelsCombobox } from "@/components/labels-combobox"
import { useState } from "react"
import AddToDo from "@/components/add-to-do"

export default function ToDoList({ path }: { path: string }) {
    const [selectedLabel, setSelectedLabel] = useState<string>("");

    return (
        <>
            <LabelsCombobox setSelectedLabel={setSelectedLabel} />
            <div className="mt-6">
                <AddToDo path={path} />
            </div>
            <FilteredToDoList path={path} label={selectedLabel} />
        </>
    )
}