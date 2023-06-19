const { getPostById } = require("../src/services/postsService");
const { WrongParametersError } = require("../src/helpers/errors");
const { Post } = require("../src/db/postModel");

describe("PostService test getPostById", () => {
  it("Should return post data by providen ID", async () => {
    mPostId = "1";
    mUserId = "2";

    const post = {
      _id: mPostId,
      topic: "topic",
      text: "text",
      userId: mUserId,
    };

    jest.spyOn(Post, "findOne").mockImplementationOnce(async () => post);

    const result = await getPostById(mPostId, mUserId);

    expect(result._id).toEqual(mPostId);
    expect(result.userId).toEqual(mUserId);
    expect(result.topic).toBeDefined();
    expect(result.text).toBeDefined();
  });
});
