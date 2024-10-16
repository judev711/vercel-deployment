import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import cookieParser from "cookie-parser";
const salt = 10;

const App = express();

App.use(cors());
App.use(cookieParser());
App.use(express.json());
App.use(express.urlencoded({extended: false}))

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bd_login",
});

App.post("/Register",(req, res)=>{
  const sql = "INSERT INTO clone (`name`, `email`, `password`) VALUE (?)";
  bcrypt.hash(req.body.password.toString(), salt, (error, hash)=>{
    if (error) return (res.json({error: "Error for hassing password"}));
     const values = [
      req.body.name,
      req.body.email,
      hash
    ];
     db.query(sql, [values], (error, resultat) => {
      if (error) return res.json({error: "Error for inserting data"});
      return res.json({status: "Succes !"});
     });

  })
 
})

App.post("/Login", (req, res)=>{
  const sql = " SELECT * FROM clone WHERE email = ? ";
  db.query(sql, [req.body.email], (err, data)=>{
    if(err) return res.json({Error: "Erreur de requete sql"});
    if(data.length  > 0)
      {
        bcrypt.compare( req.body.password, data[0].password, (err, response)=>{
          if (err) return res.json({Error:"password compare error"})
          if(response){
            console.log("+1 connecter", response)
            return res.json({status:'Succes !'})
          }else{
            return res.json({Error: 'password no matched '})
          }
        })
      }else{
        return res.json({Error:'No email exist '})
      } 
  })
})
App.use("/", (req, res)=>{
  res.send("bienvenu test N°0 reussi 1")
})
App.listen(3001, () => {
  console.log("serveur pret à executer sur le port 3001 !");
});

