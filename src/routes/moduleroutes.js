const express = require('express');
const router = express.Router();
const { createModule, getModules, getModuleByName, deleteModuleByName,getModuleBySystemAndAnneAndSpecaliteAndSemester,searchModules} = require('../controllers/modulecontroller');
const isSuperUser = require('../middleware/SuperUserMiddleware');


router.post('/add', createModule);
router.post('/semester',getModuleBySystemAndAnneAndSpecaliteAndSemester);
router.delete('/delete/:name',deleteModuleByName);
router.get('/get', getModules);
router.get('/get/:name', getModuleByName);
router.get('/search', searchModules);
module.exports = router;