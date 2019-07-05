const Topic = require("./models").Topic;
const Post = require("./models").Post;


module.exports = {

  //#1
  getAllTopics(callback) {
    return Topic.all()
      .then((topics) => {
        callback(null, topics);
      })
      .catch((err) => {
        callback(err);
      })
  },
  addTopic(newTopic, callback) {
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
  },
  getTopic(id, callback) {
    return Topic.findById(id, {
      include: [{
        model: Post,
        as: "posts"
      }]
    })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
  },
  deleteTopic(req, callback) {
    ///XXXX THIS IS WHERE ITS BREAKING XXXXX
    //Having and issue with Topic.findByPk
    //ERROR: Topic.findByPk is not a function
    //Worked around this before by changing the query to Topic.findById


    // console.log("req.params.id: ", req.params.id) //SUCCESSS
    // #1
    return Topic.findByPk(req.params.id)
      .then((topic) => {

        // #2
        const authorized = new Authorizer(req.user, topic).destroy();

        if (authorized) {
          // #3
          console.log("IN - authorized: ", authorized) //NOT GETTING HERE

          topic.destroy()
            .then((res) => {
              callback(null, topic);
            });

        } else {

          // #4
          req.flash("notice", "You are not authorized to do that.")
          callback(401);
        }
      })
      .catch((err) => {
        callback(err);
      });
  },
  updateTopic(req, updatedTopic, callback){

    // #1
         return Topic.findByPk(req.params.id)
         .then((topic) => {
    
    // #2
           if(!topic){
             return callback("Topic not found");
           }
    
    // #3
           const authorized = new Authorizer(req.user, topic).update();
    
           if(authorized) {
    
    // #4
             topic.update(updatedTopic, {
               fields: Object.keys(updatedTopic)
             })
             .then(() => {
               callback(null, topic);
             })
             .catch((err) => {
               callback(err);
             });
           } else {
    
    // #5
             req.flash("notice", "You are not authorized to do that.");
             callback("Forbidden");
           }
         });
       }
}