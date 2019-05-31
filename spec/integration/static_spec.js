const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {


      describe("GET /", () => {

        it("should return status code 200", () => {
          request.get(base, (err, res, body) => {
            // expect(res.statusCode).toBe(200);
            expect(res.statusCode).toBe("hello"); //why does this work?
            // expect(res).toBe("hi"); //why can't I have more than one test? w/o it saying 'done not found'?
            done();
          });
        });

        

      }); // GET /

  

});