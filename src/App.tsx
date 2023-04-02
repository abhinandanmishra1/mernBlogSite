import { useState, useEffect, ChangeEvent } from "react";
import { convertImageToBase64 } from "./utils";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "./api";
import { Blog } from "./Blog.type";
import { CreateBlogForm } from "./CreateBlogForm";
import { EditBlogForm } from "./EditBlogForm";
import { Blogs } from "./Blogs";

export const BlogPost = () => {

};

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [createBlogModalVisible, setCreateBlogModalVisible] = useState(false);
  const [editBlogModalVisible, setEditBlogModalVisible] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState<Blog>({
    title: "",
    description: "",
    image: "",
    _id: "",
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };
    fetchBlogs();
  }, []);

  const handleCreateBlog = async () => {
    try {
      const blog: Blog = {
        title,
        description,
        image,
      };

      const { data } = await createBlog(blog);
      setBlogs((blogs) => [...blogs, data]);
    } catch (error) {
      console.log("Error in creating blog", error);
    }

    setCreateBlogModalVisible(false);
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      const { data } = await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.log("Issues in deleting the blog", err);
    }
  };

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

  const editBlog = (blog: Blog) => {
    setUpdatedBlog((curr) => ({ ...curr, ...blog }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My Blog App</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div
            className={`rounded-lg absolute z-10 border border-1 bg-white w-[500px] left-1/3 top-1/6 ${
              !createBlogModalVisible && "hidden"
            }`}
          >
            <div className="mb-4 p-4 grid gap-10">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Create a blog</h1>
                <h4
                  className="cursor-pointer duration-500 hover:font-bold"
                  onClick={() => setCreateBlogModalVisible(false)}
                >
                  X
                </h4>
              </div>
              <CreateBlogForm
                {...{
                  title,
                  setTitle,
                  description,
                  setDescription,
                  image,
                  onFileChange,
                  handleCreateBlog,
                }}
              />
            </div>
          </div>
          <div
            className={`rounded-lg absolute z-10 border border-1 bg-white w-[500px] left-1/3 top-1/6 ${
              !editBlogModalVisible && "hidden"
            }`}
          >
            <div className="mb-4 p-4 grid gap-10">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Edit blog</h1>
                <h4
                  className="cursor-pointer duration-500 hover:font-bold"
                  onClick={() => setEditBlogModalVisible(false)}
                >
                  X
                </h4>
              </div>
              <EditBlogForm blog={updatedBlog!} setEditBlogModalVisible={setEditBlogModalVisible} />
            </div>
          </div>
          <Blogs
            {...{
              blogs,
              handleDeleteBlog,
              setCreateBlogModalVisible,
              setEditBlogModalVisible,
              editBlog,
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
