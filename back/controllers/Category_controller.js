import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

dotEnv.config();

import { con } from "../config/database.js";

/* to get all users*/
export const getCategory = async (req, res) => {
    await con
      .select("*")
      .from("category")
      .then((category) => {
        res.json(category);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };
  
  
 

/* to create a products */
export const registerCat  = async (req, res) => {
  const {name_cat} = req.body;

  // check if product already exists
  await con
    .select("*")
    .from("category")
    .where("name_cat", name_cat)
    .then((cat) => {
      if (cat.length > 0) {
        return res.status(200).json({
          exist: true,
        });
      }else{

const newCat = {
    name_cat,
};

 con
  .insert(newCat)
  .into("category")
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


export const deleteCat = async (req, res) => {
  const { id_cat } = req.params;
  await con
    .delete()
    .from("category")
    .where("id_cat", id_cat)
    .then(() => {
      res.json("category deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateCat = async (req, res) => {
    const { id_cat } = req.params;
    const { name_cat} = req.body;
    const updatedCat = { name_cat };
    await con
      .update(updatedCat)
      .from("category")
      .where("id_cat", id_cat)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Category updated"
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };



/*

export const updateUser = async (req, res) => {
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
*/
