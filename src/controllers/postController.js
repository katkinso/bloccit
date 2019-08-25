const postQueries = require("../db/queries.posts.js");
const flairQueries = require("../db/queries.flairs.js");


module.exports = {
  new(req, res, next) {
    flairQueries.getAllFlairs((err, flairs) => {
      if(err){
        res.render("posts/new", { topicId: req.params.topicId });
      } else {
        res.render("posts/new", { topicId: req.params.topicId, flairs });
      }
    })
  },
  create(req, res, next) {
    let newPost = {
      title: req.body.title,
      body: req.body.body,
      topicId: req.params.topicId,
      userId: req.user.id,
      flairs: req.body.flairs,
    };
    
    postQueries.addPost(newPost, (err, post) => {
      if (err) {
        console.log(err)
        res.status(500).redirect("/posts/new");
      } else {
        res.status(303).redirect(`/topics/${newPost.topicId}/posts/${post.id}`);
      }
    });
  },
  show(req, res, next){
    postQueries.getPost(req.params.id, (err, post) => {
      if(err || post == null){
        res.redirect(404, "/");
      } else {
        res.render("posts/show", {post});
      }
    });
  },
  destroy(req, res, next){
    postQueries.deletePost(req.params.id, (err, deletedRecordsCount) => {
      if(err){
        res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`)
      } else {
        res.redirect(303, `/topics/${req.params.topicId}`)
      }
    });
  },
  edit(req, res, next){
    postQueries.getPost(req.params.id, (err, post) => {
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
    });
  },
  update(req, res, next){
    postQueries.updatePost(req.params.id, req.body, (err, post) => {
      if(err || post == null){
        res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.id}/edit`);
      } else {
        res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
      }
    });
  }
};
