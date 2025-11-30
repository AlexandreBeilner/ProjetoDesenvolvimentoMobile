import axios from 'axios';
import { API_URL } from './index';

// cria usuário (consumer ou location)
export async function registerUser(data: any) {
  const url = `${API_URL}/users`;

  const res = await axios.post(url, data);
  return res.data;
}

// autentica usuário existente
export async function loginUser(credentials: { email: string; password: string }) {
  const url = `${API_URL}/auth/login`;

  const res = await axios.post(url, credentials);
  return res.data;
}

// pega apenas usuários do tipo "location"
export async function listLocations() {
  const url = `${API_URL}/users?userType=location`;
  console.log('🔎 listLocations ->', url);

  const res = await axios.get(url);
  return res.data;
}
