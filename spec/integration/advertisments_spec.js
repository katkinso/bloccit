const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {
  beforeEach(done => {
    this.advertisement;
    sequelize.sync({ force: true }).then(res => {
      Advertisement.create({
        title: "Advertisement Title",
        description: "Buy Chicken"
      })
        .then(advertisement => {
          this.advertisement = advertisement;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("GET /advertisements", () => {
    it("should return a status code 200 and all advertisements", done => {
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        console.log(res.statusCode);
        console.log(base);

        expect(err).toBeNull();
        expect(body).toContain("Advertisement");
        expect(body).toContain("Buy Chicken");
        done();
      });
    });
  });

  //GET BY ID START
  describe("GET /advertisements/:id", () => {
    it("should render a view with the selected advertisement", done => {
      request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Buy Chicken");
        done();
      });
    });
  }); //GET END

  //NEW AD PAGE
  describe("GET /advertisements/new", () => {
    it("should render a new advertisement form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });
  });
  //NEW AD PAGE

  //POST - CREATE
  describe("POST /advertisements/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Kates Sponge Cakes",
        description: "Kates Sponge Cakes are the best"
      }
    };

    it("should create a new advertisement and redirect", done => {
      request.post(options, (err, res, body) => {
        Advertisement.findOne({ where: { title: "Kates Sponge Cakes" } })
          .then(advertisement => {
            expect(res.statusCode).toBe(303);
            expect(advertisement.title).toBe("Kates Sponge Cakes");
            expect(advertisement.description).toBe(
              "Kates Sponge Cakes are the best"
            );
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  }); //POST END

  //DELETE
  describe("POST /advertisements/:id/destroy", () => {
    it("should delete the advertisement with the associated ID", done => {
      Advertisement.all().then(advertisements => {
        const advertisementCountBeforeDelete = advertisements.length;
        expect(advertisementCountBeforeDelete).toBe(1);

        request.post(
          `${base}${this.advertisement.id}/destroy`,
          (err, res, body) => {
            Advertisement.all().then(advertisements => {
              expect(err).toBeNull();
              expect(advertisements.length).toBe(
                advertisementCountBeforeDelete - 1
              );
              done();
            });
          }
        );
      });
    });
  }); //DELETE

  // EDIT
  describe("GET /advertisements/:id/edit", () => {

    it("should render a view with an edit advertisement form", (done) => {
      request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Advertisement Title");
        expect(body).toContain("Buy Chicken");
        done();
      });
    });

  });// EDIT

  //UPDATE
  describe("POST /advertisements/:id/update", () => {

    it("should update the advertisement with the given values", (done) => {
       const options = {
          url: `${base}${this.advertisement.id}/update`,
          form: {
            title: "Kitchen Renovations",
            description: "We will renovate your kitchen FAST!"
          }
        };

        request.post(options,
          (err, res, body) => {
          expect(err).toBeNull();
          Advertisement.findOne({
            where: { id: this.advertisement.id }
          })
          .then((advertisement) => {
            expect(advertisement.title).toBe("Kitchen Renovations");
            done();
          });
        });
    });

  });//UPDATE

});
