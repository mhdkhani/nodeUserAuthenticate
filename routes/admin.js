const express = require('express');
const router  = express.Router();
const adminController = require('../controller/admin/indexController');

//login page
router.get('/index',adminController.adminLoginPage)


module.exports  = router;