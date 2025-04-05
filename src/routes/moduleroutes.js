const express = require('express');
const router = express.Router();
const { createModule, getModules, getModuleById, deleteModule,searchModules } = require('./controllers/moduleController');
const isSuperUser = require('../middleware/isSuperUser');


router.post('/modules', isSuperUser, createModule);
router.delete('/modules/:id', isSuperUser, deleteModule);
router.get('/modules', getModules);
router.get('/modules/:id', getModuleById);
router.get('/search', searchModules);
module.exports = router;