const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("Topic", () => {

  beforeEach((done) => {
//#1
    this.topic;
    sequelize.sync({force: true}).then((res) => {


    //Create Start
    describe("#create()", () => {

        it("should create a topic object with a title & body", (done) => {

          Topic.create({
            title: "Test topic title",
            description: "Topic Description"
          })
          .then((topic) => {
            expect(topic.title).toBe("Test topic title");
            expect(post.body).toBe("Topic Description");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
   
      });//Create End



  });//MAIN
});