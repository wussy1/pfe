import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

dotEnv.config();

import { con } from "../config/database.js";

/* getserviecs */
export const getservices = async (req, res) => {
  await con
    .select("*")
    .from("service")
    .then((products) => {
      res.json(products);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
export const getorder_serv = async (req, res) => {
  await con
    .select([
      "order_service.date",
      "order_service.id",
      "order_service.etat",
      "order_service.description",
      "order_service.cars_model",
      "service.name as servname",
      "order_service.cars_model",
      "order_service.cars_model",
      "service.icon",
      "users.name",
      "users.email",
      "users.number",
    ])
    .from("order_service")
    .innerJoin("service", "service.id", "order_service.service_id")
    .innerJoin("users", "users.id", "order_service.user_id")
    .then((ordersserv) => res.json(ordersserv))
    .catch((err) => res.status(400).json("Error: " + err));
};


export const acceptDenty = async (req,res)=>{
  const {id,status}=req.params
 
status==1?( await con.raw(`update order_service set etat = "accepté" where id = ${id}`).then(()=>  res.status(200).json({
        success: true,
        message: "order accepté",
      }))):( await con.raw(`update order_service set etat = "annulé" where id = ${id}`).then(()=>  res.status(200).json({
  success: true,
  message: "order annulé",
})))
 
}

/*get order_service by user  */
export const getorder_serv_by_user = async (req, res) => {
  const { id } = req.params;
  await con
    .raw(
      `select os.date,os.description,os.cars_model,sr.name,sr.id as service_id from service sr,order_service os where sr.id=os.service_id and os.user_id=${id} `
    )
    .then((users) => {
      res.json(users[0]);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

/* add service */

export const AddServ = async (req, res) => {
  const { name, icon } = req.body;
  const newServ = { name, icon };
  await con
    .insert(newServ)
    .into("service")
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

/* delete service */
export const deleteServv = async (req, res) => {
  const { id } = req.params;
  await con
    .delete()
    .from("service")
    .where("id", id)
    .then(() => {
      res.json("service deleted");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

/* update service */

export const updateServv = async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  const updateServ = { name, icon };
  await con
    .update(updateServ)
    .from("service")
    .where("id", id)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "service updated",
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

/* get all commande */

export const addCommandeService = async (req, res) => {
  const { user_id, service_id, cars_model, description } = req.body;
  const new_serv = {
    user_id,
    service_id,
    cars_model,
    etat:"en attente",
    description,
    date: new Date(),
  };
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
};
