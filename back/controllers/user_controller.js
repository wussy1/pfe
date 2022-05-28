import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

dotEnv.config();

import { con } from "../config/database.js";


/* to get all users*/
export const getUsers = async (req, res) => {
  await con
    .select("*")
    .from("users")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};


/* to get only one user  */
export const getUser = async (req, res) => {
  const { id } = req.params;
  await con
    .select("*")
    .from("users")
    .where("id", id)
    .then((users) => {
      res.json(users[0]);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const registerUser = async (req, res) => {
  const { name, email, password,number } = req.body;

  // check if user already exists
  await con
    .select("*")
    .from("users")
    .where("email", email)
    .then((user) => {
      if (user.length > 0) {
        return res.status(200).json({
          exist: true,
        });
      }else{
// salt and hash password
const salt = bcrypt.genSaltSync(9);
const hash = bcrypt.hashSync(password, salt);

const newUser = {
  name,
  email,
  number,
  password: hash,
};

 con
  .insert(newUser)
  .into("users")
  .then(() => {
    return res.status(200).json({
      exist: false,
    });
  })
  .catch((err) =>
    res.status(200).json({
      message: err,
    })
  );
      }
    })
    .catch((err) =>
      res.status(200).json({
        message: err,
      })
    );

  
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;



  // check if user exists
  await con
    .select("*")
    .from("users")
    .where("email", email)
    .then(async (user) => {
      if (user.length === 0) {
        return res.status(404).json({
          message: "User does not exist",
        });
      } else if (!(await bcrypt.compare(password, user[0].password))) {
        return res.status(409).json({
          message: "Invalid password",
        });
       
      }
      else{
       
        const authUserState = {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          number:user[0].number
          
        };
        return res
          .status(200)
          .json(JSON.stringify(authUserState));
      }
      }

    )
    .catch((err) =>
      res.status(400).json({
        message: err,
      })
    );
};
export const  updateUserPassword = async (req, res) => {

  const { id } = req.params;
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(9);
  const hash = bcrypt.hashSync(password, salt);
  const updatedUser = { password:hash };
  await con
    .update(updatedUser)
    .from("users")
    .where("id", id)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User updated"
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateuser = async (req, res) => {

  const { id } = req.params;
  const { name,number } = req.body;
  
  const updatedUser = { name,number };
  await con
    .update(updatedUser)
    .from("users")
    .where("id", id)
    .then((user) => {
      con.select("*")
      .from("users")
      .where("id", id)
      .then(async (user) => {
    
        const authUserState = {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          number:user[0].number
          
        };
        return res
          .status(200)
          .json(JSON.stringify(authUserState));

    })})
    .catch((err) => res.status(400).json("Error: " + err));
};


/*export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email,number } = req.body;
  const updatedUser = { name, email, birthday,avatar, bio, phone, website, gender, address };
  await con
    .update(updatedUser)
    .from("users")
    .where("id", id)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User updated"
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await con
    .delete()
    .from("users")
    .where("id", id)
    .then(() => {
      res.json("User deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
*/
