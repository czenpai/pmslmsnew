import fetch from "isomorphic-fetch";
import { API } from "../config";

export const getBatches = (user) => {
  return fetch(`${API}/batch/get-batches`, {
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

export const createBatch = (formdata, token, user) => {
  return fetch(`${API}/batch/create-batch`, {
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

export const createCalender = (event, tokenId) => {
  const data = { event, tokenId };
  return fetch(`${API}/batch/create-calendar-event`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
