import dotEnv from "dotenv";

dotEnv.config();

import { con } from "../config/database.js";

/* to get all users*/
export const addRemoveFavoris = async (req, res) => {
  const { product_id, user_id } = req.body;

  await con
    .select("*")
    .from("user_favoris")
    .where({ product_id: product_id, user_id: user_id }).then(async(reslt)=>{

        if(reslt.length>0){
            await con('user_favoris')
            .where({ product_id: product_id, user_id: user_id })
            .del().then(() => {
                res.status(200).json({
                  success: true,
                  message: "Item deleted"
                });
              })
              .catch((err) => res.status(400).json("Error: " + err));

        }
        else{
            await con
            .insert({ product_id, user_id })
            .into("user_favoris")
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
        }

    })

  
};

export const GetUserFavoris = async (req, res) => {
  const { id } = req.params;
  
  await con
    .select("*")
    .from("user_favoris").innerJoin('products','products.id_prod','user_favoris.product_id')
    .where("user_id", id)
    .then((result) => {
        res.json(result);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };



  export const Isfavoris = async(req, res) => {
  
    const {product_id, user_id } = req.body;
    await con 
    .select("*")
    .from("user_favoris")
    .where({product_id: product_id, user_id: user_id})
    .then((result) => {
      if (result.length>0){
        res.json({exist:true});
      }
      else{
        res.json({exist:false});
      }
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };
  

