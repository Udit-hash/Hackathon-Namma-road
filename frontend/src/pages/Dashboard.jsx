import { useEffect, useState } from "react";
import axios from "axios";


export const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);
    

   
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
    <div className="flex  flex-col bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-50 p-6 rounded-lg text-center w-1/3">
        <div className="w-32 h-32 rounded-full mx-auto bg-blue-200 flex items-center justify-center text-4xl font-bold text-white">
            {user.firstname[0].toUpperCase()}
        </div>
        <h2 className="mt-4 text-xl font-bold">{user.firstname.toUpperCase()} {user.lastname.toUpperCase()}</h2>
        <p className="text-yellow-600 mt-2 font-semibold">🏅 points</p>
        
        </div>

        
      
      <div className="p-6 flex-1">
        <div className="flex gap-4 mb-4">
          <div className="bg-blue-100 p-4 rounded text-center w-1/3">
            <p className="text-lg font-bold">{user.totalreport}</p>
            <p className="text-blue-600">Potholes Reported</p>
          </div>
          <div className="bg-green-100 p-4 rounded text-center w-1/3">
            <p className="text-lg font-bold"></p>
            <p className="text-green-600">Potholes Fixed</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded text-center w-1/3">
            <p className="text-lg font-bold"></p>
            <p className="text-yellow-700">Badges Earned</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Badges</h3>
          <div className="flex gap-2 flex-wrap">
            
              <span
               
                className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                
              </span>
           
          </div>
        </div>
        </div>
      </div>
    </div>



       
    );
};
