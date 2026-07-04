import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const AdminRoute = ({ children }) => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });

        if (res.data.role === "admin") {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch {
        setAllowed(false);
      }
    };

    check();
  }, []);

  if (allowed === null) return <div>Loading...</div>;
  return allowed ? children : <Navigate to="/not-authorized" />;
};
