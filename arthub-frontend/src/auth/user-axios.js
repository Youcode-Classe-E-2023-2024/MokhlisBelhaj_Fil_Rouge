import useApiAxios from "../config/axios";

export const refreshUserQuery = async (setCurrentUser) => {
  console.log("refreshUser...");

  try {
    const token = localStorage.getItem("token");
    if (!!token) {
      const response = await useApiAxios.get("/refreshUser");

      const user = response.data?.user;
      setCurrentUser(user || null);
    } else {
      setCurrentUser(null);
    }
  } catch (error) {
    console.error("refreshUser failed:", error);
  }
};

export const logoutQuery = async (setCurrentUser) => {
    try{

        const response = await useApiAxios.post("/logout");
    } catch (error) {
        console.error("logout failed:", error);
      }
        

  setCurrentUser(null);
  localStorage.removeItem("token");
};