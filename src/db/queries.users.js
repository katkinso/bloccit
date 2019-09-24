// #1
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Post = require("./models").Post;
const Comment = require("./models").Comment;

module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

// #4
    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback){

    
    // #1
       let result = {};
      //  User.findById(id)
      console.log(id)
       User.scope({method: ["favoritePostsAlvaro", id]} ).findAll()
       .then(([user]) => {
          // console.log(user)
         if(!user) {
           callback(404);
         } else {
           result["user"] = user;
          //  console.log("user.favorites= ", user.favorites[0].title)
          //  callback(null,{user});
          result["favorites"] = user.favorites;
          
          Post.scope({method: ["lastFiveFor", id]}).findAll()
          .then((posts) => {

            
            result["posts"] = posts;
            
            Comment.scope({method: ["lastFiveFor", id]}).findAll()
            .then((comments) => {

              result["comments"] = comments;

              callback(null, result);
            })
            .catch((err) => {
              callback(err);
            })
          })
          .catch((err) => {
           callback(err);
         })///END

         }
          }).catch((err) => {
            console.log('err= ', err)
            callback(err);
          })

          
      //    }
      //  })
     }

}