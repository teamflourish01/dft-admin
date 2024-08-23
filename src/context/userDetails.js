import { createContext, useEffect, useState } from "react";

const userContext = createContext();

export const User = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const AuthorizationToken = `Bearer ${token}`;
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/loginuser", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.userData.image) {
          setUserData(data.userData);
        } else {
          setUserData({
            ...data.userData,
            image:
              "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
          });
        }
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    setTimeout(() => {
      localStorage.removeItem("user");
      window.location.reload();
    }, 2 * 60 * 60 * 1000);
  }, [token]);
  return (
    <userContext.Provider value={{ userData, token, getUserData }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
