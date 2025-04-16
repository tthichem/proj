const express = require('express');
const router = express.Router();
const { createModule, getModules, getModuleByName, deleteModuleByID,getModulesBox,searchModules,getDistinctSpecialites} = require('../controllers/modulecontroller');
const isSuperUser = require('../middleware/SuperUserMiddleware');


router.post('/add', createModule);
router.post('/semester',getModulesBox);
router.delete('/delete/:name',deleteModuleByID);
router.get('/get', getModules);
router.get('/get/:id', getModuleByName);
router.get('/search', searchModules);
router.get('/distinct-specialites',getDistinctSpecialites);
module.exports = router;