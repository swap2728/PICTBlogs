const BlogRoute = require('express').Router()
const BlogController = require('../controllers/Blog_controller');

BlogRoute.post('/makelike',BlogController.makeLike);
BlogRoute.post('/makeblog',BlogController.Make_Blogs);
BlogRoute.post('/makecomment',BlogController.makeComment)
BlogRoute.get('/',BlogController.showBlogs);

module.exports = BlogRoute