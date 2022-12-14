import db from "../model/db.config.js";

export const createPost = async (req, res) => {
  try {
    const { title, imgUrl, description, userId } = req.body;
    const isAuthenticated = await isUserRegistered(userId);
    if (!isAuthenticated) throw new Error("User need to be authenticated");
    const result = await postCreation(title, imgUrl, description, userId);
    res.status(201).send({
      success: true,
      payload: result,
      message: "New post is saved",
    });
  } catch (err) {
    res.status(401).send({
      success: false,
      message: err.message,
    });
  }
};

//check user is registered
const isUserRegistered = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT user_id FROM users WHERE user_id= ? ",
      [userId],
      (error, result) => {
        if (error) return reject(error);
        if (result && result[0]) {
          // console.log("User exists:", result); // for debug purposes
          return resolve(true);
        }
        resolve(false);
      }
    );
  });
};
const postCreation = (title, imgUrl, description, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO blogs (post_title, img_url , post_description, user_id) values(?,?,?,?)",
      [title, imgUrl, description, userId],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};

//fetch all blogs with author name
export const fetchBlogs = async (req, res) => {
  const fetchQuery =
    "SELECT blogs.post_id ,blogs.post_title, blogs.post_description,blogs.img_url," +
    "blogs.user_id, blogs.created_at, users.user_name FROM blogs INNER JOIN users ON blogs.user_id =users.user_id";
  const queryPromise = () => {
    return new Promise((resolve, reject) => {
      db.query(fetchQuery, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
  try {
    const result = await queryPromise();
    res.status(200).send({
      message: "ok",
      payload: result,
    });
  } catch (err) {
    res.status(400).send({
      message: "Cannot fetch data",
    });
  }
};

//fetch blog by blog id
export const fetchBlogByID = async (req, res) => {
  // console.log(req.params.id);
  const blogId = req.params.id;
  const fetchQuery =
    "SELECT blogs.post_id ,blogs.post_title, blogs.post_description,blogs.img_url," +
    "blogs.user_id, blogs.created_at, users.user_name FROM blogs INNER JOIN users ON blogs.user_id =users.user_id WHERE blogs.post_id= ?";
  const queryPromise = () => {
    return new Promise((resolve, reject) => {
      db.query(fetchQuery, [blogId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
  try {
    const result = await queryPromise();
    res.status(200).send({
      message: "ok",
      payload: result,
    });
  } catch (err) {
    res.status(400).send({
      message: "Cannot fetch data",
      error: err,
    });
  }
};

//3.update the post
export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    // console.log(blogId);
    const { userId, title, desc } = req.body;
    const posAuthorId = await findPostAuthorID(blogId);
    // console.log(posAuthorId);
    if (posAuthorId.user_id !== userId)
      throw new Error("You can update your post only");

    const result = await updateBlogContent(title, desc, blogId);
    res.status(200).send({
      message: "Blog has been updated",
      payload: result,
    });
  } catch (err) {
    res.status(401).send({ message: "Cannot Update it", error: err.message });
  }
};

const findPostAuthorID = (postId) => {
  const authorIdQuery = "SELECT user_id from blogs where post_id =?";
  return new Promise((resolve, reject) => {
    db.query(authorIdQuery, [postId], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

const updateBlogContent = (title, desc, blogId) => {
  const updateQuery =
    "UPDATE blogs SET post_title = ?, post_description = ? WHERE post_id= ?";
  return new Promise((resolve, reject) => {
    db.query(updateQuery, [title, desc, blogId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

//4.delete the post
export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);
    const { userId } = req.body;
    // console.log(req.body);
    const posAuthorId = await findPostAuthorID(blogId);
    // console.log(posAuthorId);
    if (posAuthorId.user_id !== userId)
      throw new Error("You can delete your post only");

    const result = await deleteBlogContent(blogId);
    res.status(200).send({
      message: "Blog has been deleted",
      payload: result,
    });
  } catch (err) {
    res.status(401).send({
      message: "Cannot delete it",
      error: err.message,
    });
  }
};

const deleteBlogContent = (blogId) => {
  const deleteQuery = "DELETE FROM blogs WHERE post_id=?";
  return new Promise((resolve, reject) => {
    db.query(deleteQuery, [blogId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
