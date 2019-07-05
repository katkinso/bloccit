const express = require("express");
const router = express.Router();
const validation = require("./validation");
const helper = require("../auth/helpers");

const postController = require("../controllers/postController")


router.get("/topics/:topicId/posts/new", postController.new);
// router.post("/topics/:topicId/posts/create", postController.create);
// router.post("/topics/:topicId/posts/create", validation.validatePosts, postController.create);

router.post("/topics/:topicId/posts/create",
   helper.ensureAuthenticated,
   validation.validatePosts,
   postController.create);
   
router.get("/topics/:topicId/posts/:id", postController.show);
router.post("/topics/:topicId/posts/:id/destroy", postController.destroy);
router.get("/topics/:topicId/posts/:id/edit", postController.edit);
// router.post("/topics/:topicId/posts/:id/update", postController.update);
router.post("/topics/:topicId/posts/:id/update", validation.validatePosts, postController.update);


// router.post("/topics/:topicId/posts/:id/flair-remove", postController.removeFlair);

 

module.exports = router;
