import { API_URL } from './index.ts';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    console.log(response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}