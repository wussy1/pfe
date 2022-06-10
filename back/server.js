import express from "express";
import cors from "cors";
import userRoutes from "./routes/user_routes.js";
import Products_routes from "./routes/Products_routes.js";
import Commande_routes from "./routes/Commande_routes.js";
import Categorie_routes from "./routes/Categorie_routes.js";
import Service_routes from "./routes/Service_routes.js";
import Panier_routes from "./routes/Panier_routes.js";
import Favouris_routes from "./routes/Favoris_routes.js";

import { db_conn } from "./config/database.js";



const PORT = 5000;

const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
    origin: "*",
  })
);




app.use("/api/user", userRoutes);
app.use("/api/product", Products_routes);
app.use("/api/comd", Commande_routes);
app.use("/api/cat",Categorie_routes);
app.use("/api/serv",Service_routes);
app.use("/api/pan",Panier_routes);
app.use("/api/favoris",Favouris_routes);


/*
app.use("/api/Categorie",Categorie_routes)
app.use("/api/follow", followerRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/group", groupRoutes);
// app.use("/api/share", shareRoutes);
app.use("/api/notif", notificationRoutes);
*/
db_conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});