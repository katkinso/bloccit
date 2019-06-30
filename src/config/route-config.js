
//export an object with a function called init which 
//loads the defined routes and defines them on the Express app object
module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const topicRoutes = require("../routes/topics");
      const postRoutes = require("../routes/posts");
      const flairRoutes = require("../routes/flair");
      const userRoutes = require("../routes/users");

      app.use(staticRoutes);
      app.use(postRoutes);
      app.use(topicRoutes);
      app.use(flairRoutes);
      app.use(userRoutes);

    }
  }