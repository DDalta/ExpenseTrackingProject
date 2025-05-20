import { Stat, FormatNumber } from "@chakra-ui/react"
import { useState, useEffect} from "react"
import { BASE_URL } from "@/App";

const StatsTab = () => {

    const [stats, setStats] = useState({});

    useEffect(() => {
        const getExpenseStats = async () => {
            try {
                const res = await fetch(BASE_URL + "/expense/total");
                const response_data = await res.json();

                if (!res.ok) {
                    throw new Error(response_data.error);
                }
                console.log(response_data);
                setStats(response_data)
            } catch (error) {
                console.log(error);
            }
        }
        getExpenseStats();
    }, [setStats])

    return (
        <>
        <Stat.Root>
            <Stat.Label>Total Spent</Stat.Label>
            <Stat.ValueText>
                <FormatNumber value={stats.total_expenses} style="currency" currency="USD" />
            </Stat.ValueText>
        </Stat.Root>
        </>
    )
}

export default StatsTab