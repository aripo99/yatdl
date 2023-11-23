import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const goals = [
    {
        "title": "Get Promoted",
        "description": "I want to get promoted to ML Engineer II"
    },
    {
        "title": "Become great at Competitive Programming",
        "description": "Do at least 3 problems a day"
    },
    {
        "title": "Always learning",
        "description": "I want to learn new things everyday and challenge myself at work"
    },
]

export default function Goals() {
    return (
        <>
            <h1 className="mb-6 text-3xl font-bold tracking-tighter md:text-4xl">
                Goals
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{goal.title}</CardTitle>
                            <CardDescription>{goal.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </>
    )
}