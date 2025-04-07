const pool = require("../config/database");
const isSuperUser = require("../middleware/isSuperUser"); // Importer le middleware

//  Ajouter un module (superuser )
const createModule = async (req, res) => {
    const { name, year, googleDriveLink } = req.body;

    try {
        // ajouter module a la base de données
        const newModule = await pool.query(
            "INSERT INTO modules (name, year, google_drive_link) VALUES ($1, $2, $3) RETURNING *",
            [name, year, googleDriveLink]
        );

        res.status(201).json({
            success: true,
            message: "Module ajouté avec succès !",
            module: newModule.rows[0],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de l'ajout du module.",
        });
    }
};

//  Supprimer un module (superuser uniquement)
const deleteModule = async (req, res) => {
    const { name } = req.params;

    try {
        // Supprimer le module
        const result = await pool.query("DELETE FROM modules WHERE name = $1 RETURNING *", [name]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Module non trouvé.",
            });
        }

        res.json({
            success: true,
            message: "Module supprimé avec succès.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression du module.",
        });
    }
};
//  Récupérer tous les modules
const getModules = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM modules ORDER BY year, name");
        res.json({
            success: true,
            modules: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des modules.",
        });
    }
};

//  Récupérer un module par name
const getModuleByName = async (req, res) => {
    const {name} = req.params;

    try {
        const result = await pool.query("SELECT * FROM modules WHERE name = $1", [name]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Module non trouvé.",
            });
        }

        res.json({
            success: true,
            module: result.rows[0],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération du module.",
        });
    }
};
const searchModules = async (req, res) => {
    const { query } = req.query;  // le mot rechercher

    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Aucun terme de recherche fourni",
        });
    }

    try {
        // Recherche des modules par nom 
        const result = await pool.query(
            "SELECT * FROM modules WHERE name ILIKE $1 LIMIT 10",  //ya3tik 10 7adah
            [`%${query}%`]  
        );

        res.json({
            success: true,
            modules: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la recherche des modules.",
        });
    }
}



module.exports = { createModule, getModules, getModuleByName, deleteModule,searchModules };