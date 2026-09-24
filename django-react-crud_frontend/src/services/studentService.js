import api from "./api";

export const getStudents = async (page = 1) => {
  const response = await api.get(`/students/?page=${page}`);

  return response.data;
};

export const getStudent = async (id) => {
  const response = await api.get(`/students/${id}/`);

  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await api.post("/students/", studentData);

  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}/`, studentData);

  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}/`);

  return response;
};
