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
  
