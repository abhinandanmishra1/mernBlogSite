import axios from "axios";
import { Blog } from "../Blog.type";

export const getBlogs = async () => {
  return await axios.get("https://blog-0szz.onrender.com/api/blogs");
};

export const getBlog = async (id: string) => {
  return await axios.get(`https://blog-0szz.onrender.com/api/blogs/${id}`);
};

export const createBlog = async (blog: Blog) => {
  return await axios.post("https://blog-0szz.onrender.com/api/blogs", blog);
};

export const updateBlog = async (id: string, blog: Blog) => {
  return await axios.put(`https://blog-0szz.onrender.com/api/blogs/${id}`, blog);
};

export const deleteBlog = async (id: string) => {
  return await axios.delete(`https://blog-0szz.onrender.com/api/blogs/${id}`);
};
