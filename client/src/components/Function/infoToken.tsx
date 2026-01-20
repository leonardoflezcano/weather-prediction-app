import axios from "axios";

export async function fetchUserInfo(token) {
  try {
    const response = await axios.get("http://localhost:4000/api/auth/info", {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
      },
    });
    console.log("datos de info token ", response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("No se pudo obtener la información del usuario");
  }
}
