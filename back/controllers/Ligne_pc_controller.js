import dotEnv from "dotenv";
import { raw } from "mysql";

dotEnv.config();

import { con } from "../config/database.js";


/* add plus one to item quantity */

export const PlusItem = async (req, res) => {
    const {id_prod,id_panier} = req.body;

    await con.raw(`UPDATE commande_products as cp set quantity = cp.quantity+1 where cp.PanierId =${id_panier} and cp.ProductId =${id_prod};`).then(() => {
        res.status(200).json({
          success: true,
          message: "Item qty +1"
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
      
  };

  
/* remove minus one to item quantity */

export const MinusItem = async (req, res) => {
    const {id_prod,id_panier} = req.body;

await con.raw(`select quantity from commande_products where PanierId = ${id_panier} and ProductId=${id_prod}`).then(async (result)=>{console.log(result[0][0].quantity);if(result[0][0].quantity===1){
    con.raw(`DELETE FROM commande_products as cp WHERE cp.PanierId =${id_panier} and cp.ProductId =${id_prod};`).then(() => {
        res.status(200).json({
          success: true,
          message: "Item removed"
        });
      }).catch((err) => res.status(400).json("Error: " + err));
}else{

    await con.raw(`UPDATE commande_products as cp set quantity = cp.quantity-1 where cp.PanierId =${id_panier} and cp.ProductId =${id_prod};`)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Item qty -1"
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));

}}).catch((err) => res.status(400).json("Error: " + err));

   
  };

  
/* get all commande */

export const DeleteItem = async (req, res) => {
    const {id_prod,id_panier} = req.body;

    await con('commande_products')
    .where({ PanierId: id_panier , ProductId:id_prod})
    .del().then(() => {
        res.status(200).json({
          success: true,
          message: "Item deleted"
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };

  
/* get all commande */

export const AddItem = async (req, res) => {
  const {id_panier,id_prod}=req.body;

 await con
  .select("*")
  .from("commande_products")
  .where({ PanierId: id_panier , ProductId:id_prod}).then(async (prod) => {
    if (prod.length > 0) {
      await con.raw(`UPDATE commande_products as cp set quantity = cp.quantity+1 where cp.PanierId =${id_panier} and cp.ProductId =${id_prod};`).then(() => {
        res.status(200).json({
          success: true,
          message: "Item qty +1"
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }else{
    let item = {ProductId:id_prod,quantity:1,PanierId:id_panier}
    await con
      .insert(item)
      .into("commande_products")
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
  });
    }