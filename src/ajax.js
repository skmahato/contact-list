import axios from 'axios';

const devUrl = 'http://localhost:3001/contacts';
const liveUrl = 'https://reactjs-contact-list-api.herokuapp.com/contacts';

export const getContacts = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return axios.get(devUrl);
  } else {
    return axios.get(liveUrl);
  }
};

export const newContact = (input) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return axios.post(devUrl, input);
  } else {
    return axios.post(liveUrl, input);
  }
}

export const updateContact = (val, input) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return axios.put(`${devUrl}/${val.id}`, input);
  } else {
    return axios.put(`${liveUrl}/${val.id}`, input);
  }
};

export const deleteContact = (val) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return axios.delete(`${devUrl}/${val.id}`);
  } else {
    return axios.delete(`${liveUrl}/${val.id}`)
  }
};
