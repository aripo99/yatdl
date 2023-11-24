import { FaCoins } from 'react-icons/fa';
import getSupabaseServerClient from "@/lib/supabase/server-client"

export async function UserCoins() {
    const coins = await getCoins();

    async function getCoins() {
        "use server";
        const client = getSupabaseServerClient();;
        const sessionResponse = await client.auth.getSession();
        const user = sessionResponse.data?.session?.user;
        const { data, error } = await client.from("user_coins").select().eq("user_id", user?.id).single();
        if (error) {
            console.error(error);
        }
        console.log(data);
        return data.quantity;
    }

    return (
        <div className="text-yellow-400 mt-4 mx-4" >
            <FaCoins className="text-yellow-400 mt-4 mx-8" />
            <span className="ml-1">x{coins}</span>
        </div>
    )
}