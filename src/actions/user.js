import fetch from "isomorphic-fetch";
import { API } from "../config";

export const getUsers = (user) => {
  return fetch(`${API}/user/get-users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createUser = (formdata, token, user) => {
  console.log(formdata.getAll("name"));
  return fetch(`${API}/user/create-user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formdata,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
