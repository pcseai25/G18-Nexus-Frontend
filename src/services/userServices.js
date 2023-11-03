import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const backendUrl = "http://localhost:5001";

export async function fetchUserData() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found in local storage');
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    const user = decodedToken.user;
    const response = await axios.get(`${backendUrl}/api/users/${user.id}`);
    return response.data;
  } catch (error) {
    console.error('Error decoding JWT or fetching user data:', error.message);
    return null;
  }
}
