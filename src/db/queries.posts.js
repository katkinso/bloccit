const Post = require("./models").Post;

module.exports = {

  getPosts(callback){   
    return Post.all()
  .then((posts) => {
      callback(null, posts);
    })
    .catch((err) => {
      callback(err);
    })
  }
}