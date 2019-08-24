const postQueries = require("../db/queries.posts.js");
const flairQueries = require("../db/queries.flairs.js");
const Authorizer = require("../policies/post");


module.exports = {
  new(req, res, next) {

    const authorized = new Authorizer(req.user).new();

    if (!authorized){
      req.flash("notice", "You're not authorized to do that.");
      res.redirect(`/topics/${req.params.topicId}`);
    }else{

      flairQueries.getAllFlairs((err, flairs) => {
        if(err){
          res.render("posts/new", { topicId: req.params.topicId });
        } else {
          res.render("posts/new", { topicId: req.params.topicId, flairs });
        }
      })

    }
  },
  create(req, res, next) {

    const authorized = new Authorizer(req.user).create();
    if (!authorized){
      req.flash("notice", "You're not authorized to do that.");
      res.redirect(`/topics/${req.params.topicId}`);
    }else{

      let newPost = {
        title: req.body.title,
        body: req.body.body,
        topicId: req.params.topicId,
        userId: req.user.id,
        flairs: req.body.flairs,
      };
      
      postQueries.addPost(newPost, (err, post) => {
        if (err) {
          res.redirect(500, "/posts/new");
        } else {
          res.redirect(303, `/topics/${newPost.topicId}/posts/${post.id}`);
        }
      });

    }
    
  },
  show(req, res, next){
    const authorized = new Authorizer(req.user).show();

    postQueries.getPost(req.params.id, (err, post) => {
      if(err || post == null){
        res.redirect(404, "/");
      } else {
        res.render("posts/show", {post});
      }
    });
  },
  destroy(req, res, next){
    postQueries.deletePost(req, (err, deletedRecordsCount) => {
      if(err){
        // res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`) <-- DOES NOT WORK ///Internal Server Error. Redirecting to /topics/1/posts/14
        res.status(500).redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`) // <-- WORKS
        // res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`)  <-- WORKS
      } else {
        res.redirect(303, `/topics/${req.params.topicId}`) //303
      }
    });
  }, 
  edit(req, res, next){
   
      postQueries.getPost(req.params.id, (err, post) => {

        const authorized = new Authorizer(req.user, post).edit();


        if (!authorized){
          req.flash("notice", "You're not authorized to do that.");
          res.redirect(`/topics/${req.params.topicId}`);
        }else{

            if(err || post == null){
              res.redirect(404, "/");
            } else {
              flairQueries.getAllFlairs((err, flairs) => {
                if(err){
                  res.render("posts/edit", {post});
                } else {
                  res.render("posts/edit", {post, flairs});
                }
              })
            }
          }
      });
    

  },
  update(req, res, next) {
    postQueries.updatePost(req, req.body, (err, post) => {
      
      if (err || post == null) {

        res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}/edit`); //Ask alvaro - doesn't work with 404.
      } else {
        console.log("update postController no err")
        res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
      }

    });
  }
  
};
