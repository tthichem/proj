const express = require('express');
const router = express.Router();
const { createModule, getModules, getModuleByName, deleteModuleByName,getModuleBySystemAndAnneAndSpecaliteAndSemester,searchModules} = require('../controllers/modulecontroller');
const isSuperUser = require('../middleware/SuperUserMiddleware');


router.post('/modules', isSuperUser, createModule);
router.post('/modules', isSuperUser,getModuleBySystemAndAnneAndSpecaliteAndSemester);
router.delete('/modules/:name', isSuperUser,deleteModuleByName);
router.get('/modules', getModules);
router.get('/modules/:name', getModuleByName);
router.get('/search', searchModules);
module.exports = router;