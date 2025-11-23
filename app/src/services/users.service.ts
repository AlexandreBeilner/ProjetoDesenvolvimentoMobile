import axios from 'axios';
import { API_URL } from './index';

// cria usuário (consumer ou location)
export async function registerUser(data: any) {
  const url = `${API_URL}/users`;

  console.log("📡 registerUser ->", url, data);

  return axios.post(url, data);
}

// pega apenas usuários do tipo "location"
export async function listLocations() {
  const url = `${API_URL}/users?userType=location`;
  console.log('🔎 listLocations ->', url);

  const res = await axios.get(url);
  return res.data;
}
