const Post = require("./models").Post;
const Topic = require("./models").Topic;
const FlairPosts = require("./models").FlairPosts;
const Flair = require("./models").Flair;


module.exports = {
  addPost(newPost, callback) {
    return Post.create(newPost)
      .then(post => {

        let flairs = []
        flairs = [...newPost.flairs]

        flairs.map((flairid) => {
          
          FlairPosts.create({
            postId: post.id,
            flairId: flairid
          })
        })

        callback(null, post);
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
  deletePost(id, callback){
    return Post.destroy({
      include: [{
        model: FlairPosts,
        as: "flairposts"
      }],
      where: { id }
    })
    .then((deletedRecordsCount) => {
      // user.removeRoles(user.Roles);
      console.log(deletedRecordsCount)
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updatePost(id, updatedPost, callback){
    return Post.findById(id)
    .then((post) => {
      if(!post){
        return callback("Post not found");
      }

      post.update(updatedPost, {
        fields: Object.keys(updatedPost)
      })
      .then(() => {
        callback(null, post);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }

};
