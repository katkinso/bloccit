
//export an object with a function called init which 
//loads the defined routes and defines them on the Express app object
module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const topicRoutes = require("../routes/topics");
      const postRoutes = require("../routes/posts");
      const flairRoutes = require("../routes/flair");
      const userRoutes = require("../routes/users");
      const commentRoutes = require("../routes/comments");


      //initiate the configuration if we are in the test environment
      if(process.env.NODE_ENV === "test") {
        const mockAuth = require("../../spec/support/mock-auth.js");
        mockAuth.fakeIt(app);
      }

      app.use(staticRoutes);
      app.use(postRoutes);
      app.use(topicRoutes);
      app.use(flairRoutes);
      app.use(userRoutes);
      app.use(commentRoutes);
    }
  }