import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AddGoal from "@/components/add-goal";
import getSupabaseServerClient from "@/lib/supabase/server-client"

export async function Goals() {
    const goals = await fetchGoals();

    async function fetchGoals() {
        "use server";
        const client = getSupabaseServerClient();
        const sessionResponse = await client.auth.getSession();
        const user = sessionResponse.data?.session?.user;
        const { data: goals, error } = await client.from("goals").select().eq("user_id", user?.id);
        if (error) {
            console.error(error);
        }
        return goals;
    }

    return (
        <>
            <div className="flex flex-row justify-between">
                <h1 className="mb-6 text-3xl tracking-tighter md:text-4xl">
                    Goals
                </h1>
                <AddGoal />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {goals && goals.map((goal, index) => (
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