const user_routes = require("express").Router();
const UserController = require('../controllers/user_controller')
user_routes.post('/CreateAccount',UserController.createAccount);
user_routes.post('/signin',UserController.signin)
// user_routes.post('/following',UserController.following);
user_routes.post('/follower',UserController.follower)
module.exports = user_routes; 