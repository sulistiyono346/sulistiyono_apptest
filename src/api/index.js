import axios from './middleware';

const apiUrl = 'https://contact.herokuapp.com';

export const getContactList = () => {
  return axios.get(`${apiUrl}/contact`);
};
export const addContact = payload => {
  return axios.post(`${apiUrl}/contact`, payload);
};
export const deleteContact = params => {
  return axios.delete(`${apiUrl}/contact/${params.id}`);
  // return axios.delete(`${apiUrl}/contact`, {
  //   params: {id: params.id},
  // });
};
export const updateContact = param => {
  return axios.put(
    `${apiUrl}/contact/${'cac8a370-19d1-11ee-b70b-e18263cafeee'}`,
    {...param},
  );
};
export const contactDetail = param => {
  return axios.get(`${apiUrl}/contact/${param}`);
};
