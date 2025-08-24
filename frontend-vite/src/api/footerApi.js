import api from './axiosInstance';

export const fetchFooter = async () => {
  const { data } = await api.get('/footer');
  return data; // { links, updatedAt }
};

export const updateFooterLinks = async (links) => {
  const { data } = await api.put('/footer', { links });
  return data; // { links, updatedAt }
};
