const express = require('express');
const router = express.Router();

const eventController= require('../controllers/eventController')
const userController= require('../controllers/userController')
const middleware = require('../middleware/loginmiddle')


//user api 
 router.post("/register", userController.createUser)
 router.post("/login", userController.loginUser)
 router.put("/logOut",middleware.userAuth ,userController.logOutUser)
 router.put("/changePassword",userController.changeUserPassword)
 router.put("/resetPassword",userController.resetUserPassword)
 router.put("/updatePassword/:userId", middleware.userUpdatePasswordAuth ,userController.updateUserpassword)

//event api
  router.post("/event", middleware.userAuth ,eventController.createEvent)
  router.get("/event", middleware.userAuth, eventController.getEvents)
  router.get("/event/allInvitedEventes",middleware.userAuth, eventController.inviteEventDetails)
  router.get("/event", middleware.userAuth, eventController.getEventById)
  router.put("/event",middleware.userAuth, eventController.updateEventById)



module.exports = router;