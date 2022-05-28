import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

dotEnv.config();

import { con } from "../config/database.js";


/* get all commande */

export const getCommande = async (req, res) => {
  await con
    .select("*")
    .from("commande")
    .then((commande) => {
      res.json(commande);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};


/* to get only one comd */
export const getcomd = async (req, res) => {
  const { id_comd } = req.params;
  await con
    .select("*")
    .from("commande")
    .where("id_comd", id_comd)
    .then((commande) => {
      res.json(commande[0]);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};



/* to create a commande */
export const CreateComd = async (req, res) => {
  const {date_comd,etat_comd,prix_totale,prix,name_comd,id,id_prod } = req.body;

  // check if comd already exists
  await con
    .select("*")
    .from("commande")
    .where("name_comd", name_comd)
    .then((comd) => {
      if (comd.length > 0) {
        return res.status(200).json({
          exist: true,
        });
      }else{

const newcomd = {
    
  date_comd,
  etat_comd,
  prix_totale,
  prix,
  name_comd,
  id,
  id_prod
};

 con
  .insert(newcomd)
  .into("commande")
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


// add command 
export const addCommand = async (req, res) => {
  try {
      const { products, user_id,prix } = req.body;;

      let commid;
      con.insert({etat_comd:"en attente",prix,user_id}).into("commande").then(([id])=>{
      commid=id
      const productsinsert = products.map(prod=>({CommandeId:commid,ProductId:prod.id,quantity:prod.quantity}));
       con.insert(productsinsert).into("commande_products").then(() => {
        return res.status(200).json({
          ok: true,
        });
      })   
     })
    

  }
  catch (err) {
      return {
          success: false,
          error: err.message
      };
  }
}



export const updateComd = async (req, res) => {

  const { id_comd } = req.params;
  const {date_comd,etat_comd,prix_totale,prix,name_comd,id,id_prod } = req.body;
  const salt = bcrypt.genSaltSync(9);
  const hash = bcrypt.hashSync(date_comd,etat_comd,prix_totale,prix,name_comd,id,id_prod , salt);
  const updatedComd = { date_comd,etat_comd,prix_totale,prix,name_comd,id,id_prod :hash };
  await con
    .update(updatedComd)
    .from("commande")
    .where("id_comd", id_comd)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User updated"
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
export const deleteComd = async (req, res) => {
  const { id_comd } = req.params;
  await con
    .delete()
    .from("commande")
    .where("id_comd", id_comd)
    .then(() => {
      res.json("category deleted");
    })
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
*/
