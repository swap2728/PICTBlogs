const user_routes = require("express").Router();
const UserController = require('../controllers/user_controller')
user_routes.post('/CreateAccount',UserController.createAccount);
user_routes.post('/signin',UserController.signin)

module.exports = user_routes; 