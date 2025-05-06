import { useEffect, useState } from "react";
import axios from "axios";

export const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/leaderboard", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setUsers(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h1>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="space-y-4">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div
                                key={user.id}
                                className={`flex justify-between items-center p-4 rounded-lg shadow ${
                                    index === 0
                                        ? "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-yellow-900"
                                        : index === 1
                                        ? "bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 text-gray-800"
                                        : index === 2
                                        ? "bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 text-orange-900"
                                        : "bg-gray-50 border-gray-300 text-gray-800"
                                } border`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white ${
                                            index === 0
                                                ? "border-4 border-yellow-500"
                                                : index === 1
                                                ? "border-4 border-gray-400"
                                                : index === 2
                                                ? "border-4 border-orange-500"
                                                : "border-2 border-gray-300"
                                        }`}
                                        style={{ backgroundColor: "#B0C4DE" }}
                                    >
                                        {user.firstname[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">
                                            {user.firstname} {user.lastname}
                                        </h3>
                                        <p className="text-sm">
                                            {user.totalreport} potholes reported
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold">
                                        {user.points} pts
                                    </p>
                                    {index < 3 ? (
                                        <p className="text-sm font-semibold">
                                            🎖️ Top {index + 1} Reporter
                                        </p>
                                    ) : (
                                        <p className="text-sm">Rank {index + 1}</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-6">
                            No users found on the leaderboard!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
