import { FaCoins } from 'react-icons/fa';
import { getCoins } from '@/lib/actions/get-coins';

export async function UserCoins() {
    const coins = await getCoins();

    return (
        <div className="text-yellow-400 mt-4 mx-4" >
            <FaCoins className="text-yellow-400 mt-4 mx-8" />
            <span className="ml-1">x{coins}</span>
        </div>
    )
}