const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
  this.topic;

  beforeAll(done => {
    sequelize
      .sync({ force: true })
      .then(res => {
        done();
      })
      .catch(err => {
        done();
      });
  });

  describe("#create()", () => {
    it("should create a topic object with a title and a description", done => {
      Topic.create({
        title: "Topic Test Title",
        description: "Topic Test Description"
      })
        .then(topic => {
          this.topic = topic;
          expect(topic.title).toBe("Topic Test Title");
          expect(topic.description).toBe("Topic Test Description");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  }); //DESCRIBE End

  describe("#get()", () => {
    it("should create a post object with a title, body, and assigned topic", done => {
      Post.create({
        title: "This is my post",
        body: "This is my post body",
        topicId: this.topic.id
      })
        .then(newPost => {
          this.post = newPost;
          expect(newPost.title).toBe("This is my post");
          this.post.setTopic(this.topic)
          .then((post) => {
            expect(post.topicId).toBe(newPost.topicId);
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  }); //DESCRIBE GET End



  describe("#getPost()", () => {

    it("should return the associated post", (done) => {

      this.topic.getPosts()
      .then((associatedPosts) => {
          expect(associatedPosts[0].title).toBe(this.post.title);
          expect(associatedPosts[0].body).toBe(this.post.body);
          done();
      });

    });
  });

}); //MAIN END
