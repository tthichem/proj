const bcrypt= require('bcryptjs');
const pool = require("../config/database");
const jwt = require('jsonwebtoken');
require("dotenv").config(); 
   const  registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        //  Vérifier si aslan rah msajal( l'email est déjà utilisé)
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length > 0) {
            return res.status(400).json({
                success :false,
                 message: "Cet username est déjà utilisé."
                 });
        }
        //  chifrage le mot de passe

        const hashedPassword = await bcrypt.hash(password, 10);

        //  Ajouter l'utilisateur avec le rôle "visiteur" par défaut
        const newUser = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
            [username, hashedPassword]
        );

        res.status(201).json({
            success :true,
            message: "Compte créé avec succès !",
            user: newUser.rows[0],
        });
    } catch (error) {
        res.status(500).json({ 
            success :false,
            message: "failed registre user please try again ", 

        });
    }
}
    //login controller
    const loginUser = async (req, res) => {
        const { username, password } = req.body;
    
        try {
            //  Vérifier si l'utilisateur existe (rah msajal )
            const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            const user = result.rows[0];
    
            if (!user) {
                return res.status(404).json({
                    success :false,
                    message: "utilisateur non trouvé ,il faut  insecreption"
                 });
            }
    
            //  Vérifier le mot de passe
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success :false,
                     message: "Mot de passe incorrect"
                     });
            }
            //  Générer un token JWT avec le role
            const token = jwt.sign(
                { id: user.id,
                    username: user.username,
                     role: user.role }, 
                process.env.JWT_SECRET, 
                { expiresIn: "1h" }
            );
            res.json({
                success :true,
                message: "Connexion réussie ",
                token,
            });
        } catch (error) {
            res.status(500).json({
                success :false,
                message: "Erreur" 
            });
        }
    };


    module.exports = { registerUser, loginUser };

