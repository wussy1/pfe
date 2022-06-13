import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

dotEnv.config();

import { con } from "../config/database.js";




/*get order_service by user  */
export const getorder_serv_by_user = async (req, res) => {
    const { id } = req.params;
    await con.raw(`select os.date,os.description,os.cars_model,sr.name,sr.id as service_id from service sr,order_service os where sr.id=os.service_id and os.user_id=${id} `).then((users) => {
        res.json(users[0]);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };
  

  /* get all commande */

  export const AddServ = async (req, res) => {
    const {user_id,service_id,cars_model,description}=req.body;
    const new_serv= {user_id,service_id,cars_model,description,date:new Date()};
  await con
  .insert(new_serv)
  .into("order_service")
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


  export const updateServ = async (req, res) => {
    const { id } = req.params;
    const {user_id,service_id,cars_model,description}=req.body;
    const updateServ= {user_id,service_id,cars_model,description,date:new Date()};
    await con
      .update(updateServ)
      .from("order_service")
      .where("id", id)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "service updated"
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };



  export const deleteServ = async (req, res) => {
    const { id } = req.params;
    await con
      .delete()
      .from("order_service")
      .where("id", id)
      .then(() => {
        res.json("service deleted");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  };