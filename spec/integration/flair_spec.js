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

  describe("GET /flairs/new", () => {
 
    it("should render a new flair form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });

  });


   //POST
   describe("POST /flairs/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        name: "createdFlair",
        color: "orange"
      }
    };

    it("should create a new flair and redirect", (done) => {

      request.post(options, (err, res, body) => {
        
          Flair.findOne({where: {name: "createdFlair"}})
          .then((flair) => {

            expect(res.statusCode).toBe(303);//why is this not a 303 redirect?
            // expect(res.statusCode).toBe(200); 
            expect(flair.name).toBe("createdFlair");
            expect(flair.color).toBe("orange");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });//POST END


  //DELETE
  describe("POST /flairs/:id/destroy", () => {

    it("should delete the flair with the associated ID", (done) => {

      //#1
      Flair.all()
      .then((flairs) => {

        //#2
        const flairCountBeforeDelete = flairs.length;
        expect(flairCountBeforeDelete).toBe(1);

        //#3
        request.post(`${base}${this.flair.id}/destroy`, (err, res, body) => {
          Flair.all()
          .then((flairs) => {
            expect(err).toBeNull();
            expect(flairs.length).toBe(flairCountBeforeDelete - 1);
            done();
          })

        });
      });

    });//DELETE
  });


});