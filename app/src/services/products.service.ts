import { API_URL } from './index.ts';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData: {
  title: string;
  description: string;
  price: string;
  image: string | null;
  userId: string;
}) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  return await response.json();
};

export const updateProduct = async (
  id: number,
  productData: {
    title: string;
    description: string;
    price: string;
    image: string | null;
  },
) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  return await response.json();
};

export const deleteProduct = async (
  id: number,
) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const getByUserId = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}/products/user/${userId}/list`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}