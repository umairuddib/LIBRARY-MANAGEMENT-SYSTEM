import axios from "axios";

// ================= BASE API =================
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= TOKEN ATTACH =================
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= AUTH =================
export const registerUser = (data) => {
  return API.post("/auth/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const loginUser = (data) => API.post("/auth/login", data);

// ================= BOOKS =================
export const getBooks = () => API.get("/books");

export const addBook = (data) =>
  API.post("/books", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteBook = (id) => API.delete(`/books/${id}`);

// ================= STUDENTS =================
export const getStudents = () => API.get("/students");

export const deleteStudent = (id) => API.delete(`/students/${id}`);

// ================= ISSUES =================
export const issueBook = (data) => API.post("/issues", data);

export const getIssuedBooks = () => API.get("/issues");

export const returnBook = (id) => API.put(`/issues/return/${id}`);

export const deleteIssuedBook = (id) => API.delete(`/issues/${id}`);

export default API;