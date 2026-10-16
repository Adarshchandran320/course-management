
import axiosClient from "../api/axiosClient";

const BASE_URL = "/api/courses/";

export const getCourses = () => {
  return axiosClient.get(BASE_URL);
};

export const getCourse = (id) => {
  return axiosClient.get(`${BASE_URL}${id}/`);
};

export const addCourse = (courseData) => {
  return axiosClient.post(BASE_URL, courseData);
};

export const updateCourse = (id, courseData) => {
  return axiosClient.patch(`${BASE_URL}${id}/`, courseData);
};

export const deleteCourse = (id) => {
  return axiosClient.delete(`${BASE_URL}${id}/`);
};
