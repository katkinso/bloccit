const Post = require("./models").Post;
const Topic = require("./models").Topic;
const FlairPosts = require("./models").FlairPosts;
const Flair = require("./models").Flair;
const Authorizer = require("../policies/post");

module.exports = {
  addPost(newPost, callback) {
    return Post.create(newPost)
      .then(post => {

        let flairs = [];       

        if (newPost.flairs) {
          flairs = [...newPost.flairs]
        }

        let promises =  flairs.map((flairid) => {
          FlairPosts.create({
            postId: post.id,
            flairId: flairid
          })
        })
        
        Promise.all(promises).then(
          () => callback(null, post)
        )
        
      })
      .catch(err => {
        callback(err);
      });
  },
  getPost(id, callback){

    return Post.findById(id,{
       include: [{
        model: Flair,
        as: "flairs",
        required: false,
        attributes: ['id', 'name', 'color']
      }]
    })
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deletePost(req, callback){

    return Post.findById(req.params.id)
    
      .then((post) => {

        const authorized = new Authorizer(req.user, post).destroy();

        if (authorized) {
          post.destroy() //how does it pass the id?
          .then((deletedRecordsCount) => { //delete records count?
                console.log(deletedRecordsCount)
                callback(null, deletedRecordsCount);
              })

        } else {
          req.flash("notice", "You are not authorized to do that.")
          callback(401);
        }
      })
      .catch((err) => {
        callback(err);
      });




    // return Post.destroy({
    //   where: { id }
    // })
    // .then((deletedRecordsCount) => {
    //   // user.removeRoles(user.Roles);
    //   console.log(deletedRecordsCount)
    //   callback(null, deletedRecordsCount);
    // })
    // .catch((err) => {
    //   callback(err);
    // })
  },
  updatePost(req, updatedPost, callback){
    return Post.findById(req.params.id)
    .then((post) => {

    
      if(!post){
        return callback("Post not found");
      }

      const authorized = new Authorizer(req.user, post).update();
    
           if(authorized) {

              post.update(updatedPost, {
                fields: Object.keys(updatedPost)
              })
              .then(() => {
                callback(null, post);
              })
              .catch((err) => {
                callback(err);
              });

           }else{
            req.flash("notice", "You're not authorized to do that.");
            callback("Forbidden");
           }

      
    });
  }

};
