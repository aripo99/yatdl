"use server"

export async function getLabels() {
    const labels = [
        {
            value: "work",
            label: "Work",
        },
        {
            value: "school",
            label: "School",
        },
        {
            value: "hci",
            label: "Hci",
        },
        {
            value: "ethics",
            label: "Ethics",
        },
    ]
    return labels
}