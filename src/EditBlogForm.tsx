import { ChangeEvent, useEffect, useState } from "react";
import { Blog } from "./Blog.type";
import { convertImageToBase64 } from "./utils";
import { updateBlog } from "./api";

interface EditBlogFormProps {
  blog: Blog;
  setEditBlogModalVisible: (visible: boolean) => void;
}

export const EditBlogForm = ({ blog, setEditBlogModalVisible }: EditBlogFormProps) => {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [image, setImage] = useState(blog.image);

  useEffect(() => {
    setTitle(blog.title);
    setDescription(blog.description);
    setImage(blog.image);
  }, [blog]);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    try {
      const base64 = await convertImageToBase64(file);
      setImage(base64);
    } catch (err) {
      console.log("An error occurred in coverting to base64", err);
    }
  };

  const handleUpdateBlog = async (id: string) => {
    const updatedBlog = { title, image, description };
    try {
      const { data } = await updateBlog(id, updatedBlog);
    } catch (err) {
      console.log("Updating blog was not successful", err);
    }
    setEditBlogModalVisible(false);
  };

  return (
    <form className="grid gap-10 bg-gray-50">
      <div className="flex gap-10">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-700 block w-full p-2.5"
          value={title}
          placeholder="Write title of your blog"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </div>
      <div className="flex gap-10">
        <label htmlFor="image">Image</label>
        <input type="file" onChange={onFileChange} />
      </div>
      {image && (
        <img
          className="w-full h-[200px] aspect-square border rounded shadow shadow-lg"
          src={image}
          alt="demo"
        />
      )}
      <div className="flex gap-10">
        <label htmlFor="description">Description</label>
        <textarea
          className="w-full resize-none h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-700 block w-full p-2.5"
          value={description}
          placeholder="Describe your blog..."
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleUpdateBlog(blog._id!);
        }}
        className=" w-[200px] items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Blog
      </button>
    </form>
  );
};
