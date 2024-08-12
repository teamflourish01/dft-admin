import { createContext, useEffect, useState } from "react";

const userContext = createContext();

export const User = ({ children }) => {
  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    try {
      let data = await fetch(
        `https://api.srwater.in/user/${JSON.parse(localStorage.getItem("user"))}`
      );
      data = await data.json();
      if(data.data.image){
        setUserData(data.data);
      }
    else{
      setUserData({
          ...data.data,
          image:
            "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
        })
    }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    setTimeout(()=>{
      localStorage.removeItem("user")
      window.location.reload()
    },2*60*60*1000)
  }, []);
  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
