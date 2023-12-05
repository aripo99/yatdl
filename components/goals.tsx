import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AddGoal from "@/components/add-goal";
import getSupabaseServerClient from "@/lib/supabase/server-client"
import DeleteGoalButton from "@/components/delete-goal-button";

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
            {goals && goals.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {goals.map((goal) => (
                        <Card key={goal.id}>
                            <CardHeader>
                                <CardTitle className="relative">
                                    <span>{goal.title}</span>
                                    <DeleteGoalButton id={goal.id} />
                                </CardTitle>
                                <CardDescription>{goal.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-gray-500">Add a new goal here. Goals constantly remind you of the big picture and help you align your todos with it.</p>
                </div>
            )}
        </>
    )
}