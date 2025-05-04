import { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const[potholes,setPothole]=useState([]);
    const[reportCount,setReportCount]=useState(0);

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

        const fetchPothole=async()=>{
          try{
            const res=await axios.get("http://localhost:3000/api/v1/potholes/my-report",{
              headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
              }
            });
            setPothole(res.data.reports);
            setReportCount(res.data.count);
            fetchUser();
          }catch(error){
            console.error("failed to fetch",error);
            alert("no potholes found!!!");
          }
        }

        fetchPothole();

        
    }, []);
    

   
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
      <div className="p-6">
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
          
          <div className="bg-blue-50 p-6 rounded-lg text-center w-1/3">
            <div className="w-32 h-32 rounded-full mx-auto bg-blue-200 flex items-center justify-center text-4xl font-bold text-white">
              {user.firstname[0].toUpperCase()}
            </div>
            <h2 className="mt-4 text-xl font-bold">
              {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
            </h2>
            <p className="text-yellow-600 mt-2 font-semibold">🏅 {user.points} points</p>
          </div>
  
      
          <div className="p-6 flex-1">
            <div className="flex gap-4 mb-4">
              <div className="bg-blue-100 p-4 rounded text-center w-1/3">
              <p className="text-lg font-bold">{user.totalreport||0}</p>

                <p className="text-blue-600">Potholes Reported</p>
              </div>
              <div className="bg-green-100 p-4 rounded text-center w-1/3">
                <p className="text-lg font-bold">{user.fixedreport || 0}</p>
                <p className="text-green-600">Potholes Fixed</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded text-center w-1/3">
                <p className="text-lg font-bold">{user.badges?.length || 0}</p>
                <p className="text-yellow-700">Badges Earned</p>
              </div>
            </div>
  
         
            <div>
              <h3 className="text-lg font-semibold mb-2">Badges</h3>
              <div className="flex gap-2 flex-wrap">
                {user.badges?.length ? (
                  user.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {badge}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No badges earned yet.</p>
                )}
              </div>
            </div>
  
           
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <MessageCircle className="mr-2" /> My Pothole Reports
              </h2>
  
              {potholes.length > 0 ? (
                <div className="space-y-4">
                  {potholes.map((pothole, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">
                        {pothole.lat && pothole.long
                          ? `Lat: ${pothole.lat.toFixed(4)}, Long: ${pothole.long.toFixed(4)}`
                          : "Location not specified"}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            pothole.status === "fixed"
                              ? "bg-green-100 text-green-800"
                              : pothole.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {pothole.status || "Reported"}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">
                        {pothole.description || "No description provided"}
                      </p>
                      <div className="text-xs text-gray-500">
                        Reported: {new Date(pothole.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No pothole reports found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };