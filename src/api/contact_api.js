import ajax from '../ajax';

const url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
  'http://localhost:3001/contacts' :
  'https://reactjs-contact-list-api.herokuapp.com/contacts';

export const getContacts = () => ajax(url);

export const newContact = (input) => {
  const options = { method: "POST", body: input };

  return ajax(url, options);
}

export const updateContact = (val, input) => {
  const options = {
    method: "PUT",
    body: input
  };
  const completeUrl = `${url}/${val.id}`;

  return ajax(completeUrl, options);
};

export const deleteContact = (val) => {
  const options = { method: "DELETE" };
  const completeUrl = `${url}/${val.id}`;

  return ajax(completeUrl, options);
};
