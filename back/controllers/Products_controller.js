import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

dotEnv.config();

import { con } from "../config/database.js";


/* get all products */

export const getProducts = async (req, res) => {
  await con
    .select("*")
    .from("products")
    .then((products) => {
      res.json(products);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};


/* to get only one product by id */
export const getProduct = async (req, res) => {
  const { id } = req.params;
  await con
    .select("*")
    .from("products")
    .where("id", id)
    .then((products) => {
      res.json(products[0]);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

/* to get only one product by cat */
export const getProductByCat = async (req, res) => {
  const { id_cat } = req.params;
  await con
    .select("*")
    .from("products")
    .where("id_cat", id_cat)
    .then((products) => {
      res.json(products);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

/* to create a products */
export const registerProduct = async (req, res) => {
  const {prod_name,prix,description,quantity,prod_image,id_cat } = req.body;

  // check if product already exists
  await con
    .select("*")
    .from("products")
    .where("prod_name", prod_name)
    .then((product) => {
      if (product.length > 0) {
        return res.status(200).json({
          exist: true,
        });
      }else{

const newProduct = {
  prod_name,
  prix,
  description,
  quantity,
  prod_image,
  id_cat,
};

 con
  .insert(newProduct)
  .into("products")
  .then(() => {
    return res.status(200).json({
      added:true
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
export const deleteProduct = async (req, res) => {
  const { id_prod } = req.params;
  await con
    .delete()
    .from("products")
    .where("id_prod", id_prod)
    .then(() => {
      res.json("Product deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateProduct = async (req, res) => {
  const { id_prod } = req.params;
  const { prod_name,prix,description,quantity,prod_image,id_cat } = req.body;
  const updatedProd = {prod_name,prix,description,quantity,prod_image ,id_cat };
  await con
    .update(updatedProd)
    .from("products")
    .where("id_prod", id_prod)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Prodect updated"
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

/*
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
export const updateUserPassword = async (req, res) => {

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
