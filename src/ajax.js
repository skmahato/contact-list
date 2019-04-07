const url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
  'http://localhost:3001/contacts' :
  'https://reactjs-contact-list-api.herokuapp.com/contacts';

export const getContacts = () => fetch(url).then(response => response.json());

export const newContact = (input) => {
  const options = { method: "POST", body: buildParam(input) };

  return fetch(url, options).then(response => response.json());
}

export const updateContact = (val, input) => {
  const options = {
    method: "PUT",
    body: buildParam(input),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  return fetch(`${url}/${val.id}`, options).then(response => response.json());
};

export const deleteContact = (val) => {
  const options = { method: "DELETE" };

  return fetch(`${url}/${val.id}`, options).then(response => response.json());
};

function buildParam(params) {
  let fD = new FormData();
  Object.keys(params).map(param => {
    return fD.append(param, params[param]);
  });
  return fD;
}
