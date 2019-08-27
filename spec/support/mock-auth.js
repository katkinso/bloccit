module.exports = {

    // #1 if user id in body of request will put in req.
      fakeIt(app){
    // #2
        let role, id, email;
    
    // #3
        function middleware(req,res,next){
    
    // #4
          role = req.body.role || role;
          id = req.body.userId || id;
          email = req.body.email || email;
    
    // #5
          if(id && id != 0){
            req.user = {
              "id": id,
              "email": email,
              "role": role
            };
          } else if(id == 0) {
            delete req.user;
          }
    
          if( next ){ next() }
        }
    
    // #6
        function route(req,res){
          res.redirect("/")
        }
    
    // #7
        app.use(middleware) // called before all routes
        app.get("/auth/fake", route)
      }
    }


    //write tests that depend on users being signed in, we will send requests to  /auth/fake with valid values for any needed attributes