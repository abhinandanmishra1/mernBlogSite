import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlog } from "./api";
import { Blog } from "./Blog.type";

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await getBlog(id!);
      setBlog({ ...data });
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <h1>Loading Blog...</h1>;
  }

  return (
    <div className="p-2">
      <Link
        to="/"
        className="w-[200px] items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Go to Home
      </Link>
      <div className="grid w-full justify-center gap-10 p-10">
        <img
          className="shadow shadow-lg rounded-lg"
          src={blog.image}
          alt={blog.title}
        />
        <h1 className="text-xl font-semibold text-blue-700">{blog.title}</h1>
        <p>{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogPost;
