import { useEffect, useState } from "react";
import axios from "axios";

export const Leaderboard=()=> {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/leaderboard").then(res => {
      setLeaders(res.data.leaderboard);
    });
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">🏆 Top Contributors</h2>
      <ul className="divide-y divide-gray-200">
        {leaders.map((user, index) => (
          <li key={user._id} className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">{index + 1}.</span>
              <div>
                <p className="font-medium">
                    {user.username || `${user.firstname} ${user.lastname}`}
                </p>

                <p className="text-sm text-gray-500">
                    {user.totalreport} reports • {(user.badges || []).join(", ")}
                </p>

              </div>
            </div>
            <span className="font-semibold text-blue-600">{user.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
