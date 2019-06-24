const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/flairs/";
const sequelize = require("../../src/db/models/index").sequelize;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.flair;
    sequelize.sync({force: true}).then((res) => {

      Flair.create({
       name: "TestFlair",
       color: "pink"
     }).then((flair) => {
        this.flair = flair;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });

  describe("GET /flairs", () => {

    it("should return a status code 200 and all flairs", (done) => {
      
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("TestFlair");
        expect(body).toContain("pink");
        done();
      });
    });


  });
  // GET END

});