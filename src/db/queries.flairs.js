const Flair = require("./models").Flair;

module.exports = {

//#1
  getAllFlairs(callback){   
   return Flair.all()
  .then((flairs) => {
      callback(null, flairs);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addFlair(newFlair, callback) {
    return Flair.create(newFlair)
      .then(flair => {
        callback(null, flair);
      })
      .catch(err => {
        callback(err);
      });
  }
  
}