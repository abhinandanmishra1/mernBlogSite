const request = require("supertest");
const baseURL = "http://localhost:5000/api";

describe("API routes", () => {
  let id = "";
  const blogData = {
    title: "this is testing blog",
    description: "It has some description",
    image: "just a image string",
  };

  beforeAll(async () => {
    // create a new blog post to be used in the tests
    const { body: data } = await request(baseURL).post("/blogs").send(blogData);
    blogData._id = data._id;
  });

  afterAll(async () => {
    // delete the blog post after all the tests have run
    await request(baseURL).delete(`/blogs/${blogData._id}`);
  });

  describe("GET /blogs", () => {  
    it("should return 200", async () => {
      const response = await request(baseURL).get("/blogs");
      expect(response.statusCode).toBe(200);
      expect(response.error).toBe(false);
    });
  
    it("should return blogs", async () => {
      const response = await request(baseURL).get("/blogs");
      expect(response.body.length >= 1).toBe(true);
    });
  });

  describe("POST /blogs", () => {
    it("should create a new blog post", async () => {
      const newBlogData = {
        title: "new blog post",
        description: "It's a new blog post",
        image: "another image string",
      };

      const response = await request(baseURL).post("/blogs").send(newBlogData);

      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(newBlogData.title);
      expect(response.body.description).toBe(newBlogData.description);
      expect(response.body.image).toBe(newBlogData.image);

      // this id has been stored to use it for deleting in delete api test
      id = response.body._id;
    });

    it("should return a 500 if there's an error", async () => {
      const response = await request(baseURL).post("/blogs");

      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("GET /blogs/:id", () => {
    it("should return a specific blog post", async () => {
      const response = await request(baseURL).get(`/blogs/${blogData._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(blogData.title);
      expect(response.body.description).toBe(blogData.description);
      expect(response.body.image).toBe(blogData.image);
    });

    it("should return a 404 if the blog post doesn't exist", async () => {
      const incorrectId = "605c05b9587a702e54d74542";
      const response = await request(baseURL).get(
        `/blogs/${incorrectId}`
      );

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("PUT /blogs/:id", () => {
    it("should update a specific blog post", async () => {
      const updatedBlogData = {
        title: "updated blog post",
        description: "It's an updated blog post",
        image: "a different image string",
      };

      const response = await request(baseURL)
        .put(`/blogs/${blogData._id}`)
        .send(updatedBlogData);

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(updatedBlogData.title);
      expect(response.body.description).toBe(updatedBlogData.description);
      expect(response.body.image).toBe(updatedBlogData.image);
    });

    it("should return a 404 if the blog post doesn't exist", async () => {
      const incorrectId = "605c05b9587a702e54d74542";
      const response = await request(baseURL)
        .put(`/blogs/${incorrectId}`)
        .send({ title: "updated blog post" });

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("DELETE /blogs/:id", () => {
    it("should delete a specific blog post", async () => {
      const response = await request(baseURL)
        .delete(`/blogs/${id}`)

      expect(response.statusCode).toBe(204);
      expect(response.error).toBe(false);
    });

    it("should return a 404 if the blog post doesn't exist", async () => {
      const incorrectId = "605c05b9587a702e54d74542";
      const response = await request(baseURL)
        .delete(`/blogs/${incorrectId}`)

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
