import { Link } from "react-router-dom";
import { Blog } from "./Blog.type";

interface IBlogsProps {
  blogs: Blog[];
  handleDeleteBlog: (id: string) => void;
  setCreateBlogModalVisible: (visible: boolean) => void;
  setEditBlogModalVisible: (visible: boolean) => void;
  editBlog: (blog: Blog) => void;
}

export const Blogs = ({
  blogs,
  handleDeleteBlog,
  editBlog,
  setEditBlogModalVisible,
  setCreateBlogModalVisible,
}: IBlogsProps) => {
  return (
    <div className="w-full border p-4 shadow shadow-lg rounded-lg grid gap-2">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-xl">Blogs</h1>
        <button
          onClick={() => setCreateBlogModalVisible(true)}
          className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New Blog
        </button>
      </div>
      <div className="grid gap-5">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white overflow-hidden shadow rounded-lg flex justify-between"
          >
            <div className="px-4 py-2 flex justify-between">
              <Link
                to={`/${blog._id}`}
                className="text-base font-medium text-indigo-600 hover:text-indigo-500 truncate"
              >
                {blog.title}
              </Link>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <button
                  onClick={() => {
                    editBlog(blog);
                    setEditBlogModalVisible(true);
                  }}
                  className="mr-2 text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog._id!)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
