
import axiosClient from "../api/axiosClient";

const BASE_URL = "/api/students/";

export const getStudents = () => axiosClient.get(BASE_URL);

export const getStudent = (id) =>
  axiosClient.get(`${BASE_URL}${id}/`);

export const addStudent = (studentData) =>
  axiosClient.post(BASE_URL, studentData);

export const updateStudent = (id, studentData) =>
  axiosClient.patch(`${BASE_URL}${id}/`, studentData);

export const deleteStudent = (id) =>
  axiosClient.delete(`${BASE_URL}${id}/`);
