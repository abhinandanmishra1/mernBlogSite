import axios from "axios";
import { Blog } from "../Blog.type";

export const getBlogs = async () => {
  return await axios.get("http://localhost:5000/api/blogs");
};

export const getBlog = async (id: string) => {
  return await axios.get(`http://localhost:5000/api/blogs/${id}`);
};

export const createBlog = async (blog: Blog) => {
  return await axios.post("http://localhost:5000/api/blogs", blog);
};

export const updateBlog = async (id: string, blog: Blog) => {
  return await axios.put(`http://localhost:5000/api/blogs/${id}`, blog);
};

export const deleteBlog = async (id: string) => {
  return await axios.delete(`http://localhost:5000/api/blogs/${id}`);
};
