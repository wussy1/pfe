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
  const { date_comd, etat_comd, prix_totale, prix, name_comd, id, id_prod } =
    req.body;

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
      } else {
        const newcomd = {
          date_comd,
          etat_comd,
          prix_totale,
          prix,
          name_comd,
          id,
          id_prod,
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
    const { products, user_id, prix } = req.body;

    let commid;
    con
      .insert({ etat_comd: "en attente", prix, user_id,date_comd:new Date() })
      .into("commande")
      .then(([id]) => {
        commid = id;
        const productsinsert = products.map((prod) => ({
          CommandeId: commid,
          ProductId: prod.id_prod,
          quantity: prod.quantity,
        }));
        con
          .insert(productsinsert)
          .into("commande_products")
          .then(() => {
            con
              .raw(
                `DELETE commande_products FROM commande_products INNER JOIN panier ON PanierId=panier.id Where panier.user_id = ${user_id}`
              )
              .then(() => {
                return res.status(200).json({
                  ok: true,
                });
              });
          });
      });
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};

export const updateComd = async (req, res) => {
  const { id_comd } = req.params;
  const { date_comd, etat_comd, prix_totale, prix, name_comd, id, id_prod } =
    req.body;
  const salt = bcrypt.genSaltSync(9);
  const hash = bcrypt.hashSync(
    date_comd,
    etat_comd,
    prix_totale,
    prix,
    name_comd,
    id,
    id_prod,
    salt
  );
  const updatedComd = {
    date_comd,
    etat_comd,
    prix_totale,
    prix,
    name_comd,
    id,
    id_prod: hash,
  };
  await con
    .update(updatedComd)
    .from("commande")
    .where("id_comd", id_comd)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User updated",
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

export const getusercommandes = async (req, res) => {
  const { id } = req.params;
  var finalArray =[];
  await con
    .select("*").from("commande").where("commande.user_id",id).orderBy('date_comd', 'desc')

    .then(async(rec) => {
      for (let i = 0; i < rec.length; i += 1) {
       await con.select(['commande_products.quantity', 'products.id_prod','products.prod_name','products.description','products.prod_image','products.discount','products.prix'])
.from('commande_products')
.innerJoin('products','products.id_prod','commande_products.ProductId')
.where('commande_products.CommandeId',rec[i].id_comd)
.then((res)=>finalArray.push({id:rec[i].id_comd,products:res,total:rec[i].prix,etat:rec[i].etat_comd,date:rec[i].date_comd}));
        }
    }).then(() => {
      res.json(finalArray);
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
