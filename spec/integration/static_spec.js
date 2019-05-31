const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {


      describe("TEST ROUTES", () => {

        it("`/` should return status code 200", (done) => {

          request.get(base, (err, res, body) => {
            expect(res.statusCode).toBe(200); 
            done();
          });

        });

        it("`/about` should return status code 200 and contain the string `about`", (done) => {
        
          request.get(base + 'about', (err, res, body) => {
            expect(res.statusCode).toBe(200); 
            expect(res.body).toContain('About'); 
            done();
          });

        });
      
       }); // TEST ROUTES

  

});
