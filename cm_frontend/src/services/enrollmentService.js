
import axiosClient from "../api/axiosClient";

const BASE_URL = "/api/enrollments/";

export const getEnrollments = () =>
  axiosClient.get(BASE_URL);

export const getEnrollment = (id) =>
  axiosClient.get(`${BASE_URL}${id}/`);

export const addEnrollment = (enrollmentData) =>
  axiosClient.post(BASE_URL, enrollmentData);

export const updateEnrollment = (id, enrollmentData) =>
  axiosClient.patch(`${BASE_URL}${id}/`, enrollmentData);

export const deleteEnrollment = (id) =>
  axiosClient.delete(`${BASE_URL}${id}/`);
