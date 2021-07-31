import fetch from "isomorphic-fetch";
import { API } from "../config";

export const listCoursesHeader = () => {
  return fetch(`${API}/course/list-course-header`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listCourseCards = () => {
  return fetch(`${API}/course/list-course-cards`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listCourseSchedule = () => {
  return fetch(`${API}/course/list-course-schedule`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSingleCourse = (moniker) => {
  const monikers = { moniker };

  return fetch(`${API}/course/get-single-course`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(monikers),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
