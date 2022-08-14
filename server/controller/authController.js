import bcrypt from "bcrypt";
import db from "../model/db.config.js";
import jwt from "jsonwebtoken";
const saltRounds = 10;
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, saltRounds);

    const exists = await userExists(email);
    if (exists) throw new Error("User data already exists");

    const result = await createUser(name, email, hashPassword);
    res.status(201).send({
      status: "1",
      success: "true",
      payload: result,
      message: "New user Is saved",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

//check if user exists or not
const userExists = (emailid) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT email FROM users WHERE email = ? ",
      [emailid],
      (error, result) => {
        if (error) return reject(error);

        if (result && result[0]) {
          console.log("User exists:", result); // for debug purposes
          return resolve(true);
        }

        resolve(false);
      }
    );
  });
};

//create new user
const createUser = (username, emailid, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "Insert into users (user_name,email,password) values(?,?,?)",
      [username, emailid, password],
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );
  });
};
//signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUserDetails = await userFindAll(email);
    if (!getUserDetails) throw new Error("Email does not exist");
    // console.log(getUserDetails);
    const match = await bcrypt.compare(password, getUserDetails[0].password);

    if (!match) throw new Error("Wrong Password");
    const userId = getUserDetails[0].user_id;
    const userName = getUserDetails[0].user_name;
    const userMail = getUserDetails[0].email;
    const token = jwt.sign({ userMail }, "jwtSecret_Blog", {
      expiresIn: "8h",
    });

    res.status(200).send({
      auth: true,
      token: token,
      user: { id: userId, name: userName, email: userMail },
    });
  } catch (err) {
    res.status(400).send({
      auth: false,
      message: err.message,
    });
  }
};

//find all data of an usere
const userFindAll = (emailid) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ? ",
      [emailid],
      (error, result) => {
        if (error) return reject(error);

        if (result && result[0]) {
          return resolve(result);
        }
        resolve(false);
      }
    );
  });
};
