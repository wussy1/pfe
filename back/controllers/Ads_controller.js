import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

dotEnv.config();

import { con } from "../config/database.js";

/* to get all users*/
export const getAds = async (req, res) => {
    await con
      .select("*")
      .from("advertisement").innerJoin("products","products.id_prod","advertisement.product")
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };
  
  
 

/* to create a products */
export const AddAd  = async (req, res) => {
  const {img,product} = req.body;

  // check if product already exists
  

const newAd = {
    img,
    product
}

 con
  .insert(newAd)
  .into("advertisement")
  .then(() => {
    return res.status(200).json({
      added: true,
    });
  })
  .catch((err) =>
    res.status(200).json({
      message: err,
    })
  );

  
};


export const removeAd = async (req, res) => {
  const { id } = req.params;
  await con
    .delete()
    .from("advertisement")
    .where("id", id)
    .then(() => {
      res.json("ad deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateAd = async (req, res) => {
    const { id } = req.params;
    const {img,product} = req.body;

  
  const newAd = {
      img,
      product
  }
    await con
      .update(newAd)
      .from("advertisement")
      .where("id", id)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "ad updated"
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };
