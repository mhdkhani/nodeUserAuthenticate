const express = require('express');
const router  = express.Router();



//login page
router.get('/', (req,res)=>{
    res.render('welcome' , { title: 'My Site'} );
})





module.exports = router; 