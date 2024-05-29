import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
    admin: {
      id: string;
      username: string;
    };
    iat: number;
    exp: number;
  }
  

export const useAuth = () => {
  try {
    // Parse cookies into an object
    const cookieObject = Object.fromEntries(
      document.cookie.split("; ").map((cookie) => {
        const [key, value] = cookie.split("=");
        return [key, decodeURIComponent(value)];
      })
    );

    // Get the token from cookies
    const token = cookieObject["token"];
    console.log("🚀 ~ auth ~ token:", token);

    if (!token) {
      throw new Error("No token found in cookies");
    }

    // Decode the token and extract the admin payload
    const decodedToken = jwtDecode<MyJwtPayload>(token);
    const  admin  = decodedToken.admin;
    console.log("🚀 ~ auth ~ admin:", admin);

    return admin;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // or handle the error as needed
  }
};
