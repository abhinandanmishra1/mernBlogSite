import { ChangeEvent } from "react";

interface CreateBlogFormProps {
  title: string;
  setTitle: (title: string) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  description: string;
  setDescription: (description: string) => void;
  handleCreateBlog: () => void;
  image: string;
}

export const CreateBlogForm = ({
  title,
  setTitle,
  description,
  setDescription,
  onFileChange,
  handleCreateBlog,
  image,
}: CreateBlogFormProps) => {
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
          handleCreateBlog();
        }}
        className=" w-[200px] items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Blog
      </button>
    </form>
  );
};
