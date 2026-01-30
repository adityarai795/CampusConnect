import api from './api';

export const fetchMarketPlaceItems = async () => {
  const response = await api.get('/marketplace/ShowAllProducts');
  return response.data;
}

export const fetchMarketPlaceItemById = async (id) => {
  const response = await api.get(`/marketplace/GetProduct/${id}`);
  return response.data;
}
export const addMarketPlaceItem = async (itemData) => {
  const response = await api.post('/marketplace/AddProduct', itemData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}