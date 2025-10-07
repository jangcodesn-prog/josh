const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // remplace si besoin
  password: "",       // mets ton mot de passe MySQL
  database: "newsletter"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connecté à MySQL !");
});

// Route pour gérer l'inscription
app.post("/subscribe", (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.send("Email manquant !");
  }

  const sql = "INSERT INTO subscribers (email) VALUES (?)";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.send("Erreur lors de l'inscription.");
    }
    res.send("Merci, vous êtes inscrit !");
  });
});

// Lancer le serveur
app.listen(3000, () => {
  console.log("🚀 Serveur démarré sur http://localhost:3000");
});
