const express = require('express');
const router = express.Router();
const multer = require('multer'); // Add this line to import multer

const controller = require('../controller/controller');
const Router = require('router');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',controller.getloginpage)

router.post('/login',controller.postloginpage)

router.get('/dashboard',controller.getadmindashboard)

router.get('/adddriver',controller.getadddriver)

router.post('/register',controller.postadddriver)

router.get('/updatedriver',controller.getupdatedriver)

router.get('/searchdriver',controller.getsearchdriver)

router.get('/deletedriver', controller.getdeletedriver)

router.post('/search_driver', controller.postsearchdriver)

router.post('/search_update_driver', controller.postsearchupdatedriver)

router.post('/update_driver', controller.postupdatedriver)

router.post('/search_delete_driver', controller.postsearchdeletedriver);

router.post('/delete_driver', controller.postdeletedriver);

router.get('/addbus',controller.getaddbus);

router.post('/addbus',controller.postaddbus);

router.get('/searchbus',controller.getsearchbus);

router.post('/search_bus', controller.postsearchbus);

router.get('/updatebus',controller.getupdatebus);

router.post('/search_update_bus', controller.postsearchupdatebus)

router.post('/update_bus', controller.postupdatebus)

router.get('/deletebus',controller.getdeletebus)

router.post('/search_delete_bus', controller.postsearchdeletebus)

router.post('/delete_bus', controller.postdeletebus)

router.get('/complaints', controller.getcomplaints)

router.get('/feedback', controller.getfeedback)

router.get('/emergency', controller.getemergency)


module.exports = router;