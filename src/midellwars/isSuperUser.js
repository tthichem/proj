const isSuperUser = (req, res, next) => {
    // Vérifier si l'utilisateur connecté est un superuser
    if (req.user.role !== 'superuser') {
        return res.status(403).json({
            success: false,
            message: "Accès refusé. Seul le superuser peut effectuer cette action."
        });
    }
    next(); 
};

module.exports = isSuperUser;